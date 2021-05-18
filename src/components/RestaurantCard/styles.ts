import styled from 'styled-components';

export const StylesContainer = styled.div`
  display: flex;
  justify-content: space-between;

  border: 2px solid var(--background);
  border-radius: 0.75rem;

  margin-bottom: 1rem;

  cursor: pointer;

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
      margin-top: 0.5rem;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 1rem;

    transition: transform 0.2s;
  }
`;
