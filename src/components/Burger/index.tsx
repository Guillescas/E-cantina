import { ReactElement } from 'react';

import { StyledBurger } from './styles';

interface IBurgerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Burger = ({ open, setOpen }: IBurgerProps): ReactElement => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
