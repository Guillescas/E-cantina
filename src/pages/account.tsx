import { ReactElement, useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';
import Input from '../components/Input';

import { withSSRAuth } from '../utils/withSSRAuth';
import getvalidationErrors from '../utils/getValidationErrors';

import { api } from '../services/apiClient';

import { StylesContainer, Content, ContentList } from '../styles/Pages/Account';

interface IRestaurantProps {
  id: number;
  email: string;
  name: string;
  description?: string;
  category: {
    id: number;
    name: string;
  };
}

interface SignInFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Account = (): ReactElement => {
  const [restaurants, setRestaurants] = useState<IRestaurantProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const handleSignUpFormSubmit = useCallback(async (data: SignInFormData) => {
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
        })
        .catch(error => {
          return toast.error(
            `Erro inesperado. Tente novamente mais tarde ${error}`,
          );
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getvalidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <StylesContainer>
      <SEO title="Minha conta" />
      <TopDashboardMenu setIsLoading={setIsLoading} />

      <Content>
        <LeftDashboardMenu />

        <ContentList>
          <h1>Informações sobre a minha conta</h1>

          <Form onSubmit={handleSignUpFormSubmit} ref={formRef}>
            <Input name="name" placeholder="Nome" label="Nome" />
          </Form>
        </ContentList>
      </Content>
    </StylesContainer>
  );
};

export default Account;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
