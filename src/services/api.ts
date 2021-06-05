import axios, { AxiosError, AxiosInstance } from 'axios';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { toast } from 'react-toastify';

import { AuthTokenErrorInvalid } from './errors/AuthTokenErrorInvalid';
import { AuthTokenErrorExpired } from './errors/AuthTokenErrorExpired';

export function setupAPIClient(ctx = undefined): AxiosInstance {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies['@ECantina:token']}`,
    },
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (!error.response) {
        return Promise.reject(error);
      }

      if (error.response.status === 401) {
        destroyCookie(ctx, '@ECantina:token');
        Cookie.remove('@ECantina:user');

        if (process.browser) {
          toast.error('Sua sessão foi expirada. Faça login novamente :)');
          Router.push('/');
        } else {
          return Promise.reject(new AuthTokenErrorExpired());
        }
      }

      if (error.response.status === 403) {
        if (error.response.config.url === '/authentication') {
          return toast.error('Usuário ou senha inválidos');
        }
        destroyCookie(ctx, '@ECantina:token');
        Cookie.remove('@ECantina:user');

        setCookie(ctx, '@ECantinaReturnMessage', error.response.data.message, {
          maxAge: 5, // 3 segundos
          path: '/',
        });

        if (process.browser) {
          toast.error('Token inválido. Faça login novamente');
          Router.push('/');
        } else {
          return Promise.reject(new AuthTokenErrorInvalid());
        }
      }

      if (error.response.status === 404) {
        if (process.browser) {
          toast.error(error.response.data.message);
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
