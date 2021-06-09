import styled, { css } from 'styled-components';

interface IStylesContainerProps {
  selected: boolean;
}

export const StylesContainer = styled.div<IStylesContainerProps>`
  display: flex;
  flex-direction: column;
  background: var(--background);

  max-width: 9rem;
  min-width: 9rem;
  max-height: 9rem;

  padding: 1.25rem 1rem;

  border-radius: 0.75rem;
  border: 2px solid transparent;

  ${props =>
    props.selected &&
    css`
      border: 2px solid var(--success);
      box-shadow: var(--success) 0px 0px 16px;
    `}

  p {
    margin: 0.25rem 0;
  }

  button {
    border-radius: 0.25rem;
    background: var(--primary);
    color: var(--background);
    font-weight: 500;
    border: none;

    padding: 0.5rem 0.5rem;
    margin-top: 0.5rem;
  }
`;
