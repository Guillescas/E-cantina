import { ReactElement, useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import TopMenu from '../../components/TopMenu';
import SignModal from '../../components/SignModal';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SEO from '../../components/SEO';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import { useSignInModal } from '../../hooks/signinModal';

import { StylesContainer } from '../../styles/Pages/ClientSignUp';

interface SignInFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Client = (): ReactElement => {
  const router = useRouter();

  const { loginModalIsOpen, closeLoginModal } = useSignInModal();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpFormSubmit = useCallback(
    async (data: SignInFormData) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().email().required('E-mail obrigatório'),
          password: Yup.string()
            .min(8, 'A senha precisa ter no mínimo 8 caracteres')
            .required('Senha obrigatória'),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não correspondem',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const userData = {
          name: data.name,
          email: data.email,
          password: data.password,
          type: 'client',
        };

        await api
          .post('/client', userData)
          .then(response => {
            if (!response.data) {
              return toast.error('Erro ao cadastrar o usuário');
            }

            toast.success('Cadastro realizado com sucesso');
            router.push('/');
          })
          .catch(error => {
            return toast.error(
              `Erro inesperado. Tente novamente mais tarde ${error}`,
            );
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
      setIsLoading(false);
    },
    [router],
  );

  return (
    <StylesContainer>
      <SignModal
        isModalOpen={loginModalIsOpen}
        onRequestClose={closeLoginModal}
      />
      <SEO title="Cadastre-se" />
      <div>
        <TopMenu />

        <h1>Cadastre-se agora mesmo!</h1>

        <Form ref={formRef} onSubmit={handleSignUpFormSubmit}>
          <Input
            name="name"
            icon={FiUser}
            label="Nome completo"
            placeholder="Nome completo"
          />
          <Input
            name="email"
            icon={FiMail}
            label="E-mail"
            placeholder="E-mail"
          />
          <Input
            name="password"
            icon={FiLock}
            label="Senha"
            placeholder="Senha"
            type="password"
          />
          <Input
            name="confirmPassword"
            icon={FiLock}
            label="Confirme sua senha"
            placeholder="Confirme sua senha"
            type="password"
          />

          <Button type="submit" isLoading={isLoading}>
            Cadastrar-me
          </Button>
        </Form>
      </div>

      <img src="/assets/signup1.jpeg" alt="Imagem de comida" />
    </StylesContainer>
  );
};

export default Client;
