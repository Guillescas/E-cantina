import styled from 'styled-components';

export const StylesContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--background);

  max-width: 8rem;
  min-width: 8rem;
  max-height: 8rem;

  padding: 1.25rem 1rem;

  border-radius: 0.75rem;

  p {
    margin: 0.25rem 0;
  }

  button {
    border-radius: 0.25rem;
    background: #640d14;
    color: #e4b1ab;
    border: none;

    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
  }
`;
