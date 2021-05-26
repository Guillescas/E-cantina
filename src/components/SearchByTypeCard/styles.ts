import styled, { css } from 'styled-components';

interface IStylesContainerProps {
  color: string;
}

export const StylesContainer = styled.div<IStylesContainerProps>`
  position: relative;

  max-width: 180px;
  min-width: 180px;
  width: 100%;
  max-height: 120px;
  min-height: 120px;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: filter 0.1s;

  ${props => css`
    border: 2px solid #${props.color};
  `}
  border-radius: 0.75rem;

  &:hover {
    filter: brightness(0.8);
  }

  img {
    position: absolute;

    max-width: 180px;
    max-height: 120px;
    width: 100%;
    height: 100%;
    object-fit: cover;

    filter: brightness(0.4);

    border-radius: 0.75rem;

    box-sizing: border-box;
    z-index: 1;
  }

  p {
    z-index: 2;

    font-weight: 700;
    font-size: 1.25rem;
  }
`;
