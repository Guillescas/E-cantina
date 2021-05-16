import styled from 'styled-components';

export const StylesContainer = styled.div`
  display: flex;

  border: 2px solid var(--background);
  border-radius: 0.75rem;

  img {
    width: 180px;
    height: 100px;

    border-radius: 0.75rem 0 0 0.75rem;
    margin-right: 1rem;
  }

  h2 {
    margin-top: 0.5rem;
  }
`;
