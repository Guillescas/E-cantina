/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import Cookie from 'js-cookie';

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

interface AuthContextData {
  user: IClientProps;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface ITokenResponse {
  sub: string;
  email: string;
  name: string;
  type: string;
  iat: number;
  exp: number;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = Cookie.get('@ECantina:token');
    const user = Cookie.get('@ECantina:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    await api
      .post('/login', {
        email,
        password,
      })
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
      });
  }, []);

  const signOut = useCallback(() => {
    Cookie.remove('@ECantina:token');
    Cookie.remove('@ECantina:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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
