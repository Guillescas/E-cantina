import styled from 'styled-components';

export const StylesContainer = styled.div`
  max-width: 280px;
  width: 100%;

  height: 100%;

  background: var(--second-background);
  border-radius: 0.75rem;

  padding: 1rem 0 1rem 1.5rem;

  .item {
    height: 32px;
    margin: 1rem 0;

    font-size: 1.25rem;
    color: var(--text);

    display: flex;
    align-items: center;

    cursor: pointer;

    border-right: 4px solid transparent;

    transition: color 0.1s;

    &:hover {
      color: var(--hover-text);
    }

    p {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;

      margin-left: 1rem;
      padding-right: 1rem;

      span {
        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 50%;
        background: var(--text);
        color: var(--background);

        font-size: 0.9rem;

        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }

  .item.selected {
    border-right: 4px solid var(--primary);
    color: var(--primary);

    &:hover {
      cursor: initial;
    }
  }
`;
