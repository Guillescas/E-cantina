import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored?: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--backgroud);
  border-radius: 10px;
  padding: 4px 16px;
  width: 100%;

  color: vat(--text);

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
      color: #bee3db;
      border-color: #bee3db;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #bee3db;
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

    &::placeholder {
      color: chartreuse(--hover-text);
    }

    &:-webkit-autofill {
      background-color: transparent !important;
      -webkit-box-shadow: 0 0 0 50px var(--background) inset;
      box-shadow: 0 0 0 50px var(--background) inset;
      -webkit-text-fill-color: var(--text) !important;
    }
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
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
      visibility: visible;
    }
  }
`;
