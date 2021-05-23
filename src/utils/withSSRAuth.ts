import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (!cookies['@ECantina:token']) {
      return {
        redirect: {
          destination: '/FAQ',
          permanent: false,
        },
      };
    }

    const recivedFn = await fn(ctx);

    return recivedFn;
  };
}
