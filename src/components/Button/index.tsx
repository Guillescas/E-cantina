import { ButtonHTMLAttributes, ReactElement } from 'react';

import Loading from '../Loading';

import { StylesContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface IButtonProps extends ButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button = ({
  children,
  isLoading,
  isDisabled,
  ...rest
}: IButtonProps): ReactElement => (
  <StylesContainer type="button" {...rest} disabled={isLoading || isDisabled}>
    {isLoading ? <Loading /> : children}
  </StylesContainer>
);

export default Button;
