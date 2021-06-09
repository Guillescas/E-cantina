import styled from 'styled-components';
import { shade } from 'polished';

export const StylesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 100vw;
  max-width: 100vw;
  width: 100%;
  height: 70%;

  > .images {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;

    padding: 2rem 4rem 0.75rem 4rem;

    border: 2px solid var(--secondary);
    border-radius: 0.75rem;

    > img {
      height: 18rem;
    }

    > button {
      margin: 2rem 3rem 1rem 3rem;
      padding: 0.75rem 0;
      border-radius: 0.25rem;

      border: 0px;
      outline: none;

      background-color: var(--primary);
      color: var(--background);
      font-size: 1rem;
      font-weight: 700;

      transition: 0.2s;

      &:hover {
        background: ${shade(0.2, `#8d99ae`)};
        transform: translateY(-0.25rem);
      }
    }
  }

  > .text {
    margin-top: 3.5rem;

    > p {
      font-size: 1.5rem;

      > span {
        text-decoration: line-through var(--secondary) 4px;
      }
    }
  }
`;

