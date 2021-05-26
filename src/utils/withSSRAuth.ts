import Cookies from 'js-cookie';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { toast } from 'react-toastify';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
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
      const recivedFn = await fn(ctx);

      return recivedFn;
    } catch (error) {
      destroyCookie(ctx, '@ECantina:token');
      Cookies.remove('@ECantina:user');

      toast.info('Seu token foi expirado. Faça login novamente');

      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  };
}
