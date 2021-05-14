import { ReactElement, useCallback, useRef, useState } from 'react';
import { MenuItem, Menu as MenuUI } from '@material-ui/core';
import Modal from 'react-modal';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { FiLock, FiMail } from 'react-icons/fi';

import Input from '../Input';
import Button from '../Button';

import { StylesContainer } from './styles';
import getvalidationErrors from '../../utils/getValidationErrors';

interface ISignModalProps {
  isModalOpen: boolean;
  onRequestClose: () => void;
}

interface SignInFormData {
  email: string;
  password: string;
}

const SignModal = ({
  isModalOpen,
  onRequestClose,
}: ISignModalProps): ReactElement => {
  const loginFormRef = useRef<FormHandles>(null);

  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDropdownMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseBurgerMenu = () => {
    setAnchorEl(null);
  };

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setIsLoading(true);
      try {
        loginFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // await signIn({
        //   email: data.email,
        //   password: data.password,
        // });

        router.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(err);

          loginFormRef.current?.setErrors(errors);
        }
      }
      setIsLoading(false);
    },
    [router],
  );

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <StylesContainer>
        <h2>Login</h2>

        <Form ref={loginFormRef} onSubmit={handleSubmit}>
          <div>
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />
          </div>

          <div>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
          </div>

          <Button type="submit" isLoading={isLoading}>
            Entrar
          </Button>
        </Form>

        <div className="login-links">
          <a role="button" onClick={event => handleOpenDropdownMenu(event)}>
            Criar uma conta
          </a>
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
                router.push('/signup/stablishment');
              }}
            >
              Sou um estabelecimento
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push('/signup/client');
              }}
            >
              Sou um cliente
            </MenuItem>
          </MenuUI>
          <a href="/forgot-password">Esqueci minha senha</a>
        </div>
      </StylesContainer>
    </Modal>
  );
};

export default SignModal;
