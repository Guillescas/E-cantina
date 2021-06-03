import { ReactElement } from 'react';

import { StylesContainer } from '../styles/Pages/404';

const NotFound = (): ReactElement => {
  return (
    <StylesContainer>
      <img src="/assets/notFound.svg" alt="notFound" />

      <p>Página não encontrada, tente novamente mais tarde</p>
    </StylesContainer>
  );
};

export default NotFound;
