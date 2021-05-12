import styled from 'styled-components';

export const StylesContainer = styled.div`
  display: flex;
  justify-content: space-between;

  min-width: 100vw;
  max-width: 100vw;
  width: 100%;

  > div {
    flex: 1;
    margin: 0 5rem;

    h1 {
      margin-bottom: 3rem;
    }

    form {
      max-width: 500px;
      display: grid;

      @media (max-width: 1010px) {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
    }
  }

  img {
    max-height: 100vh;

    @media (max-width: 1300px) {
      display: none;
    }
  }
`;
