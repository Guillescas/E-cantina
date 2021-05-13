import { MenuItem, Menu as MenuUI } from '@material-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import { ReactElement, useRef, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FiChevronDown, FiSearch, FiUser } from 'react-icons/fi';

import { useBurger } from '../../hooks/burger';
import { useSignInModal } from '../../hooks/signinModal';
import Input from '../Input';

import { StylesContainer, BurgerStyles, InlineMenu } from './styles';

const TopDashboardMenu = (): ReactElement => {
  const router = useRouter();

  const formRef = useRef<FormHandles>(null);

  const { openLoginModal } = useSignInModal();

  const { toggleMenu, isMenuOpen, stateChangeHandler } = useBurger();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenDropdownMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseBurgerMenu = () => {
    setAnchorEl(null);
  };

  return (
    <StylesContainer>
      <InlineMenu>
        <nav>
          <div className="user-card">
            <div className="user-avatar">
              <FiUser />
            </div>

            <div className="user-infos">
              <h5>Guilherme</h5>
              <p>gui.illescas@gmail.com</p>
            </div>

            <FiChevronDown />
          </div>

          <Form ref={formRef} onSubmit={() => console.log('a')}>
            <Input name="search" icon={FiSearch} />
          </Form>

          <div className="links">
            <button type="button" className="signout-button">
              Sair
            </button>
          </div>
        </nav>
      </InlineMenu>

      <img src="/assets/logo.png" alt="Logo" />

      <BurgerStyles>
        <Menu
          className="burger-menu"
          isOpen={isMenuOpen}
          onStateChange={state => stateChangeHandler(state)}
        >
          <a>Link 1</a>
          <a>Link 2</a>
          <a>Link 3</a>

          <button
            type="button"
            className="signup-button"
            onClick={event => {
              handleOpenDropdownMenu(event);
            }}
          >
            Criar conta
          </button>
          <MenuUI
            id="simple-menu"
            keepMounted
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseBurgerMenu}
          >
            <MenuItem
              onClick={() => {
                toggleMenu();
                handleCloseBurgerMenu();
                router.push('/signup/restaurant');
              }}
            >
              Sou um restaurante
            </MenuItem>
            <MenuItem
              onClick={() => {
                toggleMenu();
                handleCloseBurgerMenu();
                router.push('/signup/establishment');
              }}
            >
              Sou um estabelecimento
            </MenuItem>
            <MenuItem
              onClick={() => {
                toggleMenu();
                handleCloseBurgerMenu();
                router.push('/signup/client');
              }}
            >
              Sou um cliente
            </MenuItem>
          </MenuUI>
          <button
            type="button"
            className="signin-button"
            onClick={() => {
              openLoginModal();
              toggleMenu();
            }}
          >
            Entrar
          </button>
        </Menu>
      </BurgerStyles>
    </StylesContainer>
  );
};

export default TopDashboardMenu;
