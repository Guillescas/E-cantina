import { ReactElement } from 'react';
import { StylesContainer } from '../styles/Pages/Presentation';

const Presentation = (): ReactElement => {
  return (
    <StylesContainer>
      <div className="images">
        <img src="/assets/presentation.svg" alt="Food" />

        <img src="/assets/logo.png" alt="Logo" />
        <button type="button">CONHEÇA JÁ</button>
      </div>

      <div className="text">
        <p>Uma aplicação desenvolvida para resolver um problema</p>
      </div>
    </StylesContainer>
  );
};

export default Presentation;
