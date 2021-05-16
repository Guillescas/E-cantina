import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { ReactElement, useRef } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FiSearch, FiUser } from 'react-icons/fi';

import { useBurger } from '../../hooks/burger';
import { useSignInModal } from '../../hooks/signinModal';

import Input from '../Input';

import {
  StylesContainer,
  BurgerStyles,
  InlineMenu,
  UserCardDropdown,
} from './styles';

const TopDashboardMenu = (): ReactElement => {
  const formRef = useRef<FormHandles>(null);

  const { openLoginModal } = useSignInModal();

  const { toggleMenu, isMenuOpen, stateChangeHandler } = useBurger();

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
          </div>
          <UserCardDropdown />

          <Form ref={formRef} onSubmit={() => console.log('a')}>
            <Input
              name="search"
              icon={FiSearch}
              placeholder="Busque por um restaurante aqui"
            />
          </Form>
        </nav>
      </InlineMenu>

      <BurgerStyles>
        <Menu
          className="burger-menu"
          isOpen={isMenuOpen}
          onStateChange={state => stateChangeHandler(state)}
        >
          <a>Link 1</a>
          <a>Link 2</a>
          <a>Link 3</a>

          <button type="button" className="signup-button">
            Criar conta
          </button>
          {/* <MenuUI
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
          </MenuUI> */}
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
