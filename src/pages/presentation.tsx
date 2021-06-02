import { ReactElement, useState } from 'react';
import { StylesContainer } from '../styles/Pages/Presentation';

const Presentation = (): ReactElement => {
  return (
    <StylesContainer>
      <img src="/assets/logo.png" alt="Logo" />
    </StylesContainer>
  );
};

export default Presentation;
