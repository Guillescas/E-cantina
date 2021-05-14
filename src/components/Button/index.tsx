import { ButtonHTMLAttributes, ReactElement } from 'react';

import Loading from '../Loading';

import { StylesContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface IButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const Button = ({
  children,
  isLoading,
  ...rest
}: IButtonProps): ReactElement => (
  <StylesContainer type="button" {...rest} disabled={isLoading}>
    {isLoading ? <Loading /> : children}
  </StylesContainer>
);

export default Button;
