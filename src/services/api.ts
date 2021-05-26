import axios, { AxiosError, AxiosInstance } from 'axios';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { toast } from 'react-toastify';

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
      if (error.response.status === 403) {
        destroyCookie(undefined, '@ECantina:token');
        Cookie.remove('@ECantina:user');

        toast.info('Seu token foi expirado. Faça login novamente');

        if (process.browser) {
          Router.push('/dashboard');
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
