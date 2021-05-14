import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IButtonStyleProps {
  disabled: boolean;
}

export const StylesContainer = styled.button<IButtonStyleProps>`
  width: 100%;
  height: 56px;
  background: var(--primary);

  border-radius: 10px;
  border: 0;
  padding: 0 16px;

  color: var(--background);
  font-weight: 500;
  font-size: 1rem;

  margin-top: 16px;

  transition: background-color 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${props =>
      !props.disabled &&
      css`
        background: ${shade(0.2, `#8d99ae`)};
      `}
  }
`;
