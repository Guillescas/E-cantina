import styled from 'styled-components';

export const StylesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 100vw;
  max-width: 100vw;
  width: 100%;
  height: 65vh;

  > img {
    height: 19rem;
  }

  > p {
    margin-top: 3rem;
    font-size: 1.5rem;
  }
`;
