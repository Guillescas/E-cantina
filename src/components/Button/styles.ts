import styled from 'styled-components';
import { shade } from 'polished';

export const StylesContainer = styled.button`
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

  &:hover {
    background: ${shade(0.2, `#bee3db`)};
  }
`;
