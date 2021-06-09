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
import { useSignInModal } from './signinModal';

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
  urlImage: string;
}

interface IUpdateUserInfosProps {
  name: string;
  email: string;
  cpf: string;
  // password: string;
}

interface IUpdateUserProps {
  dataOfUser: IUpdateUserInfosProps;
  setIsUserEditingFields: (isUserEditingFields: boolean) => void;
}

interface IUpdateUserImageProps {
  dataOfUser: string;
  setIsUserUpdatingImage: (isUserUpdatingImage: boolean) => void;
}

interface AuthContextData {
  token: string;
  user: IClientProps;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  isAuthenticated: boolean;
  updateUser(props: IUpdateUserProps): Promise<void>;
  updateUserImage(props: IUpdateUserImageProps): Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }: IAuthProviderProps) => {
  const router = useRouter();
  const { setModalLoginIsOpen } = useSignInModal();

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
          api.defaults.headers.Authorization = `Bearer ${token}`;

          const decodedJWTToken: ITokenResponse = await jwt_decode(token);
          const formattedUserInfosFromToken = {
            sub: decodedJWTToken.sub,
            email: decodedJWTToken.email,
            name: decodedJWTToken.name,
            type: decodedJWTToken.type,
            urlImage: decodedJWTToken.urlImage,
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

          if (formattedUserInfosFromToken.type === 'client') {
            router.push('/dashboard');
          }

          if (formattedUserInfosFromToken.type === 'restaurant') {
            router.push('/restaurants/dashboard');
          }
        })
        .then(() => {
          destroyCookie(undefined, '@ECantinaReturnMessage');
        })
        .catch(error => {
          return toast.error(error);
        });
    },
    [router],
  );

  const updateUser = useCallback(
    async ({ dataOfUser, setIsUserEditingFields }: IUpdateUserProps) => {
      api
        .patch(`/client/${data.user.sub}`, dataOfUser)
        .then(response => {
          if (!response.data) {
            return toast.error('Erro ao atualizar o usuário');
          }

          setData({
            token: data.token,
            user: {
              ...data.user,
              name: dataOfUser.name,
              email: dataOfUser.email,
            },
          });
        })
        .then(() => {
          toast.success('Dados atualizados com sucesso');
          setIsUserEditingFields(false);
        })
        .catch(error => {
          return toast.error(
            `Erro inesperado. Tente novamente mais tarde ${error}`,
          );
        });
    },
    [data.token, data.user],
  );

  const updateUserImage = useCallback(
    async ({ dataOfUser, setIsUserUpdatingImage }: IUpdateUserImageProps) => {
      setData({
        token: data.token,
        user: {
          ...data.user,
          urlImage: dataOfUser,
        },
      });
      setIsUserUpdatingImage(false);
    },
    [data.token, data.user],
  );

  const signOut = useCallback(async () => {
    await router.push('/');

    destroyCookie(undefined, '@ECantina:token');
    Cookies.remove('@ECantina:user');

    setData({} as AuthState);

    setModalLoginIsOpen(false);
  }, [router, setModalLoginIsOpen]);

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        user: data.user,
        signIn,
        signOut,
        isAuthenticated,
        updateUser,
        updateUserImage,
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
