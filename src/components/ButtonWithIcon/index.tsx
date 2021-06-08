import { ButtonHTMLAttributes, ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';

import Loading from '../Loading';

import { StylesContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface IButtonProps extends ButtonProps {
  isLoading?: boolean;
  isSuccess?: boolean;
  icon: React.ComponentType<IconBaseProps>;
}

const ButtonWithIcon = ({
  children,
  isLoading,
  isSuccess,
  icon: Icon,
  ...rest
}: IButtonProps): ReactElement => {
  return (
    <StylesContainer
      type="button"
      {...rest}
      className={`${isSuccess && 'success'}`}
    >
      {isLoading ? <Loading /> : <span>{children}</span>}
      <Icon className="icon" size={16} color={isSuccess && '#fff'} />
    </StylesContainer>
  );
};

export default ButtonWithIcon;
