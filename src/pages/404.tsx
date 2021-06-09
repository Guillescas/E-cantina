import { ReactElement } from 'react';
import TopMenu from '../components/TopMenu';

import { StylesContainer } from '../styles/Pages/404';

const NotFound = (): ReactElement => {
  return (
    <>
      <TopMenu />

      <StylesContainer>
        <img src="/assets/notFound.svg" alt="notFound" />

        <p>PÁGINA NÃO ENCONTRADA, TENTE NOVAMENTE MAIS TARDE...</p>
      </StylesContainer>
    </>
  );
};

export default NotFound;
