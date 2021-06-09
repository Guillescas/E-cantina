import styled from 'styled-components';

export const StylesContainer = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;

    text-align: center;
  }

  p {
    text-align: center;
  }

  form {
    > div {
      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 2rem;

      div {
        cursor: pointer;

        .hide {
          display: none;
        }
      }
    }

    button {
      margin: 2rem auto 0;
      max-width: 80%;
    }
  }
`;
