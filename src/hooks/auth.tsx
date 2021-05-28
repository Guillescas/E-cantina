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
}

interface IUpdateUserInfosProps {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

interface IUpdateUserProps {
  dataOfUser: IUpdateUserInfosProps;
  setIsUserEditingFields: (isUserEditingFields: boolean) => void;
}

interface AuthContextData {
  token: string;
  user: IClientProps;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  isAuthenticated: boolean;
  updateUser(props: IUpdateUserProps): Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }: IAuthProviderProps) => {
  const router = useRouter();

  // FIXME - Separar token de user
  const [data, setData] = useState<AuthState>(() => {
    const { '@ECantina:token': token } = parseCookies();
    const user = Cookies.get('@ECantina:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const isAuthenticated = !!data.user;

  const signIn = useCallback(async ({ email, password }) => {
    const userData = {
      email,
      password,
    };

    api
      .post('/authentication', userData)
      .then(async response => {
        const { token } = response.data;

        api.defaults.headers.Authorization = `Bearer ${token}`;

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
      })
      .then(() => {
        destroyCookie(undefined, '@ECantinaReturnMessage');
        destroyCookie(undefined, '@ECantinaReturnMessage');
      })
      .catch(() => {
        return toast.error('Ocorreu um erro ao realizar login');
      });
  }, []);

  const updateUser = useCallback(
    async ({ dataOfUser, setIsUserEditingFields }: IUpdateUserProps) => {
      api
        .patch(`/client/${data.user.sub}`, dataOfUser)
        .then(async response => {
          if (!response.data) {
            return toast.error('Erro ao atualizar o usuário');
          }

          setData({
            token: data.token,
            user: {
              name: dataOfUser.name,
              email: dataOfUser.email,
              ...data.user,
            },
          });
        })
        .then(() => {
          api
            .post('/authentication', {
              email: dataOfUser.email,
              password: dataOfUser.password,
            })
            .then(async response => {
              const { token } = response.data;

              api.defaults.headers.Authorization = `Bearer ${token}`;

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
            })
            .then(() => {
              destroyCookie(undefined, '@ECantinaReturnMessage');
              destroyCookie(undefined, '@ECantinaReturnMessage');

              toast.success('Dados atualizados com sucesso');
              setIsUserEditingFields(false);
            })
            .catch(error => {
              if (error.response.data.message === 'Bad credentials') {
                return toast.error('Senha incorreta. Tente novamente');
              }

              return toast.error('Ocorreu um erro atualizar os dados');
            });
        })
        .catch(error => {
          return toast.error(
            `Erro inesperado. Tente novamente mais tarde ${error}`,
          );
        });
    },
    [data.token, data.user],
  );

  const signOut = useCallback(async () => {
    destroyCookie(undefined, '@ECantina:token');
    Cookies.remove('@ECantina:user');

    setData({} as AuthState);

    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        user: data.user,
        signIn,
        signOut,
        isAuthenticated,
        updateUser,
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
