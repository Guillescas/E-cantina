import { MenuItem, Menu as MenuUI } from '@material-ui/core';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

import { useBurger } from '../../hooks/burger';
import { useSignInModal } from '../../hooks/signinModal';

import { StylesContainer, BurgerStyles, InlineMenu } from './styles';

const TopMenu = (): ReactElement => {
  const { openLoginModal } = useSignInModal();

  const router = useRouter();

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
          <img src="/assets/logo.png" alt="Logo" />

          <div className="links">
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
                  router.push('/signup/restaurant');
                }}
              >
                Sou um restaurante
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseBurgerMenu();
                }}
              >
                Sou um estabelecimento
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseBurgerMenu();
                }}
              >
                Sou um cliente
              </MenuItem>
            </MenuUI>
            <button
              type="button"
              className="signin-button"
              onClick={() => openLoginModal()}
            >
              Entrar
            </button>
          </div>
        </nav>
      </InlineMenu>

      <img src="/assets/logo.png" alt="Logo" />

      <BurgerStyles>
        <Menu
          className="burger-menu"
          right
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
                router.push('/signup/stablishment');
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

export default TopMenu;
