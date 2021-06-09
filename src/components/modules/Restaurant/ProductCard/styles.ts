import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const StylesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  max-width: 250px;
  min-width: 250px;
  width: 100%;

  img {
    max-width: 250px;
    width: 100%;

    border-radius: 0.5rem 0.5rem 0 0;
  }

  h2 {
    margin: 0.5rem 0 0.25rem;
  }

  p {
    margin-bottom: 0.25rem;
  }

  span {
    color: var(--primary);
    font-weight: bold;
    font-size: 1.5rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--primary);
    padding: 0.5rem 1rem;

    font-size: 1rem;

    border: none;
    border-radius: 0.5rem;

    margin-top: 0.5rem;

    transition: background-color 0.2s;

    p {
      margin: 0;
      margin-left: 0.25rem;
    }

    &:hover {
      ${css`
        background: ${shade(0.2, `#8d99ae`)};
      `}
    }
  }
`;
