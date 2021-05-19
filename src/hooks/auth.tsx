/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { IClientProps } from '../@types';

import api from '../services/api';

interface AuthState {
  token: string;
  user: IClientProps;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface ITokenResponse {
  sub: string;
  email: string;
  name: string;
  type: string;
  iat: number;
  exp: number;
}

interface AuthContextData {
  token: string;
  user: IClientProps;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }: any) => {
  const router = useRouter();

  const [data, setData] = useState<AuthState>(() => {
    const token = Cookie.get('@ECantina:token');
    const user = Cookie.get('@ECantina:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }) => {
      const userData = {
        email,
        password,
      };
      api
        .post('/login', userData)
        .then(response => {
          const { token } = response.data;

          const decodedJWTToken: ITokenResponse = jwt_decode(token);

          const formattedUserInfosFromToken = {
            sub: decodedJWTToken.sub,
            email: decodedJWTToken.email,
            name: decodedJWTToken.name,
            type: decodedJWTToken.type,
          };

          Cookie.set('@ECantina:token', token);
          Cookie.set(
            '@ECantina:user',
            JSON.stringify(formattedUserInfosFromToken),
          );

          setData({ token, user: formattedUserInfosFromToken });

          router.push('/dashboard');
        })
        .catch(error => {
          return toast.error('Ocorreu um erro ao realizar login');
        });
    },
    [router],
  );

  const signOut = useCallback(async () => {
    await router.push('/');

    Cookie.remove('@ECantina:token');
    Cookie.remove('@ECantina:user');

    setData({} as AuthState);
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ token: data.token, user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export default AuthContext;
