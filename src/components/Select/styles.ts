import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored?: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;

  background: var(--background);
  padding: 4px 16px;
  width: 100%;

  border-radius: 10px;
  border: 2px solid var(--second-background);

  color: var(--text);

  display: flex;
  align-items: center;

  transition: color 0.2s, border 0.2s;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #ee6c4d;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--primary);
      border-color: var(--primary);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--primary);
    `}

  select {
    flex: 1;
    border: 0;
    background: transparent !important;
    color: #fff;

    border: none;
    outline: none;

    font-size: 1rem;

    padding: 1rem 0.75rem;

    transition: all 0.1s linear;
    -webkit-transition: all 0.1s linear;
    -moz-transition: all 0.1s linear;
    -webkit-appearance: none;

    &::placeholder {
      color: chartreuse(--hover-text);
    }

    &:-webkit-autofill {
      color: var(--text);
      background-color: transparent !important;
      box-shadow: 0 0 0 50px var(--second-background) inset;
      -webkit-box-shadow: 0 0 0 50px var(--second-background) inset;
      -webkit-text-fill-color: var(--text) !important;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      font-size: 14px;
      top: -5px;
      margin-left: 2px;
      color: var(--primary);
    }
  }

  label {
    position: absolute;
    top: calc(50% - 12px);
    left: 56px;

    padding: 5px;
    box-sizing: border-box;

    color: var(--hover-text);

    pointer-events: none;
    transition: all 0.1s linear;
    -webkit-transition: all 0.1s linear;
    -moz-transition: all 0.1s linear;
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #ee6c4d;
    color: #fff;
    z-index: 10;

    &::before {
      border-color: #ee6c4d transparent;
      visibility: visible;
    }
  }
`;
