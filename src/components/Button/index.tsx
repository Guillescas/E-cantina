import { ButtonHTMLAttributes, ReactElement } from 'react';

import { StylesContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: ButtonProps): ReactElement => (
  <StylesContainer type="button" {...rest}>
    {children}
  </StylesContainer>
);

export default Button;
