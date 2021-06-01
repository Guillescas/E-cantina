import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const StylesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 10rem;

  input {
    text-align: center;
    font-size: 1.5rem;

    height: 40px;
    max-width: 3rem;

    border: none;
    color: #fff;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  background: var(--primary);

  border: 0;
  padding: 0 0.75rem;

  color: var(--background);
  font-weight: 500;
  font-size: 1rem;

  transition: background-color 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  &.minus {
    border-radius: 0.75rem 0 0 0.75rem;
  }

  &.plus {
    border-radius: 0 0.75rem 0.75rem 0;
  }

  &:hover {
    ${props =>
      !props.disabled &&
      css`
        background: ${shade(0.2, `#8d99ae`)};
      `}
  }
`;
