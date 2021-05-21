import axios, { AxiosError } from 'axios';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.status === 403) {
      Cookie.remove('@ECantina:token');
      Cookie.remove('@ECantina:user');

      Router.push('/');

      toast.info('Seu token foi expirado. Faça login novamente');
    }

    return Promise.reject(error);
  },
);

export default api;
