import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { api } from '../services/apiClient';

import { AuthTokenErrorInvalid } from '../services/errors/AuthTokenErrorInvalid';
import { AuthTokenErrorExpired } from '../services/errors/AuthTokenErrorExpired';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    // TODO - Colocar IDs nos toast
    const cookies = parseCookies(ctx);

    if (!cookies['@ECantina:token']) {
      destroyCookie(undefined, '@ECantina:token');

      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      await api.get('/authentication', {
        headers: {
          Authorization: `Bearer ${cookies['@ECantina:token']}`,
        },
      });

      const recivedFn = await fn(ctx);

      return recivedFn;
    } catch (error) {
      if (error instanceof AuthTokenErrorInvalid) {
        setCookie(
          ctx,
          '@ECantinaReturnMessage',
          'Token inválido. Faça login para usar a plataforma',
          {
            maxAge: 5, // 5 segundos
            path: '/',
          },
        );
      }

      if (error instanceof AuthTokenErrorExpired) {
        setCookie(
          ctx,
          '@ECantinaReturnMessage',
          'Sua sessão foi expirada. Faça login novamente :)',
          {
            maxAge: 5, // 5 segundos
            path: '/',
          },
        );
      }

      destroyCookie(ctx, '@ECantina:token');

      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  };
}
