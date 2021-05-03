import { ReactElement } from 'react';

import { StyledMenu } from './styles';

interface IMenuOfBurgerProps {
  open: boolean;
}

const MenuOfBurger = ({ open }: IMenuOfBurgerProps): ReactElement => {
  return (
    <StyledMenu
      open={open}
      style={open ? { display: 'flex' } : { display: 'none' }}
    >
      <div className="links">
        <a href="/">
          <span role="img" aria-label="about us">
            💁🏻‍♂️
          </span>
          About us
        </a>
        <a href="/">
          <span role="img" aria-label="price">
            💸
          </span>
          Pricing
        </a>
        <a href="/">
          <span role="img" aria-label="contact">
            📩
          </span>
          Contact
        </a>
      </div>
    </StyledMenu>
  );
};

export default MenuOfBurger;
