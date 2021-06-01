import styled from 'styled-components';

export const StylesContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  max-width: 100%;

  padding: 0 0.75rem;

  background: var(--primary);
  border: none;
  border-radius: 0.5rem;

  transition: width 0.2s;

  .icon {
    color: transparent;
    transition: all 0.2s;
    width: 0px;
    height: 0px;
  }

  span {
    margin-right: 0.25rem;
    padding-bottom: 1px;
    transition: all 0.2s;
  }

  &:hover {
    .icon {
      width: 16px;
      height: 16px;

      color: var(--background);
    }
  }
`;
