import { MenuItem, Menu as MenuUI } from '@material-ui/core';
import { ReactElement, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useBurger } from '../../hooks/burger';

import { StylesContainer, BurgerStyles, InlineMenu } from './styles';

interface ITopMenuProps {
  isWhiteBoxOpen: boolean;
  openWhiteBox: (isOpen: boolean) => void;
  setRegisterOption: (option: string) => void;
  openModal: (isOpen: boolean) => void;
}

const TopMenu = ({
  openWhiteBox,
  isWhiteBoxOpen,
  setRegisterOption,
  openModal,
}: ITopMenuProps): ReactElement => {
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
          <h1>Logo</h1>

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
                  setRegisterOption('restaurant');
                  openWhiteBox(true);
                  handleCloseBurgerMenu();
                }}
              >
                Sou um restaurante
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setRegisterOption('establishment');
                  openWhiteBox(true);
                  handleCloseBurgerMenu();
                }}
              >
                Sou um estabelecimento
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setRegisterOption('client');
                  openWhiteBox(true);
                  handleCloseBurgerMenu();
                }}
              >
                Sou um cliente
              </MenuItem>
            </MenuUI>
            <button
              type="button"
              className="signin-button"
              onClick={() => openModal(true)}
            >
              Entrar
            </button>
          </div>
        </nav>
      </InlineMenu>

      <h1>Logo</h1>

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
                setRegisterOption('restaurant');
                openWhiteBox(true);
                toggleMenu();
                handleCloseBurgerMenu();
              }}
            >
              Sou um restaurante
            </MenuItem>
            <MenuItem
              onClick={() => {
                setRegisterOption('establishment');
                openWhiteBox(true);
                toggleMenu();
                handleCloseBurgerMenu();
              }}
            >
              Sou um estabelecimento
            </MenuItem>
          </MenuUI>
          <button
            type="button"
            className="signin-button"
            onClick={() => {
              openModal(true);
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
