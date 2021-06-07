import styled from 'styled-components';

export const StylesContainer = styled.div`
  display: flex;
  justify-content: space-between;

  border: 2px solid var(--background);
  border-radius: 0.75rem;

  margin-bottom: 1rem;

  background: var(--background);
  color: var(--second-text);

  &:hover {
    .icon {
      transform: translateX(0.5rem);
    }
  }

  img {
    width: 180px;
    height: 100px;

    border-radius: 0.75rem 0 0 0.75rem;
    margin-right: 1rem;
  }

  .infos {
    flex: 1;

    h2 {
      margin: 0.5rem 0 0.25rem;
    }
  }

  .see-qr-code {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 1rem;

    transition: transform 0.2s;

    p {
      margin-right: 0.5rem;
      cursor: pointer;
      font-weight: 500;
    }

    svg {
      max-height: 100px;
      max-width: 100px;
    }

    button {
      background: none;
      border: none;
      border-radius: 0.25rem;

      color: var(--text);
      font-size: 1rem;

      padding: 0.75rem;

      transition: background 0.1s;

      &:hover {
        background: var(--second-background);
      }
    }
  }
`;
