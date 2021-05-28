import { ButtonHTMLAttributes, ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';

import Loading from '../Loading';

import { StylesContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface IButtonProps extends ButtonProps {
  isLoading?: boolean;
  icon: React.ComponentType<IconBaseProps>;
}

const ButtonWithIcon = ({
  children,
  isLoading,
  icon: Icon,
  ...rest
}: IButtonProps): ReactElement => {
  return (
    <StylesContainer type="button" {...rest}>
      {isLoading ? <Loading /> : <span>{children}</span>}
      <Icon className="icon" size={16} />
    </StylesContainer>
  );
};

export default ButtonWithIcon;
