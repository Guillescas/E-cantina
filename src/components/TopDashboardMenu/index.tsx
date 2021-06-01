import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { ReactElement, useCallback, useRef } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FiSearch, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import { useBurger } from '../../hooks/burger';
import { useSignInModal } from '../../hooks/signinModal';
import { useAuth } from '../../hooks/auth';

import InputWithLabel from '../Inputs/InputWithoutLabel';

import getvalidationErrors from '../../utils/getValidationErrors';

import {
  StylesContainer,
  BurgerStyles,
  InlineMenu,
  UserCardDropdown,
} from './styles';

interface ISearchRestaurantFormData {
  name: string;
}

interface ITopDashboardMenuProps {
  setIsLoading?: (props: boolean) => void;
}

const TopDashboardMenu = ({
  setIsLoading,
}: ITopDashboardMenuProps): ReactElement => {
  const { user } = useAuth();
  const { openLoginModal } = useSignInModal();
  const { toggleMenu, isMenuOpen, stateChangeHandler } = useBurger();

  const router = useRouter();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ISearchRestaurantFormData) => {
      setIsLoading(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do restaurante obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        router.push({
          pathname: '/restaurant/search',
          query: { keyword: data.name },
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(error);

          formRef.current?.setErrors(errors);
        }
      }
      setIsLoading(false);
    },
    [router, setIsLoading],
  );

  return (
    <StylesContainer>
      <InlineMenu>
        <nav>
          <div className="user-card">
            <div className="user-avatar">
              <img
                src={`http://localhost:8080${user && user.urlImage}`}
                alt={`Imagem de ${user && user.name}`}
              />
            </div>

            <div className="user-infos">
              <h5>{user && user.name}</h5>
              <p>{user && user.email}</p>
            </div>
          </div>
          <UserCardDropdown />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputWithLabel
              name="name"
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
