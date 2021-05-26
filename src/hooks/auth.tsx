/* eslint-disable camelcase */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from 'react';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import Cookies from 'js-cookie';

import { IClientProps } from '../@types';

import { api } from '../services/apiClient';

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
  isAuthenticated: boolean;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }: IAuthProviderProps) => {
  const router = useRouter();

  const [data, setData] = useState<AuthState>(() => {
    const { '@ECantina:token': token } = parseCookies();
    const user = Cookies.get('@ECantina:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const isAuthenticated = !!data.user;

  const signIn = useCallback(
    async ({ email, password }) => {
      const userData = {
        email,
        password,
      };

      api
        .post('/authentication', userData)
        .then(async response => {
          const { token } = response.data;

          const decodedJWTToken: ITokenResponse = await jwt_decode(token);
          const formattedUserInfosFromToken = {
            sub: decodedJWTToken.sub,
            email: decodedJWTToken.email,
            name: decodedJWTToken.name,
            type: decodedJWTToken.type,
          };
          setData({ token, user: formattedUserInfosFromToken });

          setCookie(undefined, '@ECantina:token', token, {
            maxAge: 60 * 60 * 24, // 1 dia
            path: '/',
          });
          Cookies.set(
            '@ECantina:user',
            JSON.stringify(formattedUserInfosFromToken),
          );

          api.defaults.headers.Authorization = `Bearer ${token}`;
        })
        .then(() => {
          router.push('/dashboard');
        })
        .catch(() => {
          return toast.error('Ocorreu um erro ao realizar login');
        });
    },
    [router],
  );

  const signOut = useCallback(async () => {
    await router.push('/');

    destroyCookie(undefined, '@ECantina:token');
    Cookies.remove('@ECantina:user');

    setData({} as AuthState);
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        user: data.user,
        signIn,
        signOut,
        isAuthenticated,
      }}
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
