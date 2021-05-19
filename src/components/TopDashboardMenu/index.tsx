import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { ReactElement, useCallback, useRef } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FiSearch, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useBurger } from '../../hooks/burger';
import { useSignInModal } from '../../hooks/signinModal';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import Input from '../Input';

import {
  StylesContainer,
  BurgerStyles,
  InlineMenu,
  UserCardDropdown,
} from './styles';
import getvalidationErrors from '../../utils/getValidationErrors';

interface IRestaurantProps {
  id: number;
  email: string;
  name: string;
  description?: string;
  category: string;
}

interface ISearchRestaurantFormData {
  name: string;
}

interface ITopDashboardMenuProps {
  setRestaurants: (restaurants: IRestaurantProps[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const TopDashboardMenu = ({
  setRestaurants,
  setIsLoading,
}: ITopDashboardMenuProps): ReactElement => {
  const { user, token } = useAuth();
  const { openLoginModal } = useSignInModal();
  const { toggleMenu, isMenuOpen, stateChangeHandler } = useBurger();

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

        api
          .get(`/restaurant?name=${data.name}`, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then(response => {
            setRestaurants(response.data.content);
          })
          .catch(error => {
            console.log(error);
            return toast.error('Houve um erro inesperado. Tente mais tarde');
          });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(error);

          formRef.current?.setErrors(errors);
        }
      }

      setIsLoading(false);
    },
    [setIsLoading, setRestaurants],
  );

  return (
    <StylesContainer>
      <InlineMenu>
        <nav>
          <div className="user-card">
            <div className="user-avatar">
              <FiUser />
            </div>

            <div className="user-infos">
              <h5>{user && user.name}</h5>
              <p>{user && user.email}</p>
            </div>
          </div>
          <UserCardDropdown />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
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
