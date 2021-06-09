import { ReactElement, useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FiUser } from 'react-icons/fi';

import { useBurger } from '../../../../hooks/burger';
import { useSignInModal } from '../../../../hooks/signinModal';
import { useAuth } from '../../../../hooks/auth';

import {
  StylesContainer,
  BurgerStyles,
  InlineMenu,
  UserCardDropdown,
} from './styles';

const TopDashboardMenu = (): ReactElement => {
  const { user } = useAuth();
  const { openLoginModal } = useSignInModal();
  const { toggleMenu, isMenuOpen, stateChangeHandler } = useBurger();

  const [userImageUrl, setUserImageUrl] = useState('');

  useEffect(() => {
    if (!user.urlImage) {
      return setUserImageUrl('');
    }
    setUserImageUrl(user.urlImage);
  }, [user]);

  return (
    <StylesContainer>
      <InlineMenu>
        <nav>
          <div className="user-card">
            <div className="user-avatar">
              {userImageUrl === '' ? (
                <FiUser />
              ) : (
                <img
                  src={`http://localhost:8080${userImageUrl}`}
                  alt={`Imagem de ${user && user.name}`}
                />
              )}
            </div>

            <div className="user-infos">
              <h5>{user && user.name}</h5>
              <p>{user && user.email}</p>
            </div>
          </div>
          <UserCardDropdown />
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
