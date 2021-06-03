import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { StylesContainer } from '../styles/Pages/Presentation';

const Presentation = (): ReactElement => {
  const router = useRouter();

  return (
    <StylesContainer>
      <div className="images">
        <img src="/assets/presentation.svg" alt="Food" />

        <img src="/assets/logo.png" alt="Logo" />

        <button type="button" onClick={() => router.push('/')}>
          CONHEÇA JÁ
        </button>
      </div>

      <div className="text">
        <p>
          Uma aplicação desenvolvida para resolver um <span>problema</span>
        </p>
      </div>
    </StylesContainer>
  );
};

export default Presentation;
