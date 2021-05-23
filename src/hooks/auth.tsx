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

import { api } from '../services/apiClient';

interface AuthState {
  token: { [key: string]: string };
  user: { [key: string]: string };
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
  token: any;
  user: any;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }: IAuthProviderProps) => {
  const router = useRouter();

  const [data, setData] = useState<AuthState>(() => {
    const token = parseCookies(undefined, '@ECantina:token');
    const user = parseCookies(undefined, '@ECantina:user');

    if (token && user) {
      return { token, user };
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

          setCookie(undefined, '@ECantina:token', token, {
            maxAge: 60 * 60 * 24 * 30, // 30 dias
            path: '/',
          });
          setCookie(
            undefined,
            '@ECantina:user',
            JSON.stringify(formattedUserInfosFromToken),
            {
              maxAge: 60 * 60 * 24 * 30, // 30 dias
              path: '/',
            },
          );

          setData({ token, user: formattedUserInfosFromToken });

          router.push('/dashboard');
        })
        .catch(error => {
          console.log(error);
          return toast.error('Ocorreu um erro ao realizar login');
        });
    },
    [router],
  );

  const signOut = useCallback(async () => {
    await router.push('/');

    destroyCookie(undefined, '@ECantina:token');
    destroyCookie(undefined, '@ECantina:user');

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
