import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { FiCreditCard, FiEdit2, FiMail, FiSave, FiUser } from 'react-icons/fi';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';
import Input from '../components/Input';
import ButtonWithIcon from '../components/ButtonWithIcon';

import { withSSRAuth } from '../utils/withSSRAuth';
import getvalidationErrors from '../utils/getValidationErrors';

import { api } from '../services/apiClient';

import { useAuth } from '../hooks/auth';

import { StylesContainer, Content, ContentList } from '../styles/Pages/Account';

interface IUpdateUserInfosFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
}

interface IUserResponse {
  email: string;
  name: string;
  type: string;
  cpf: string;
}

const Account = (): ReactElement => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isUserEditingFields, setIsUserEditingFields] = useState(false);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    api
      .get(`/client/${user.sub}`)
      .then(response => {
        const userData: IUserResponse = response.data;

        const separatedName = userData.name.split(' ');

        if (!userData.cpf) {
          formRef.current?.setData({
            firstName: separatedName[0],
            lastName: separatedName[separatedName.length - 1],
            email: userData.email,
          });
        } else {
          formRef.current?.setData({
            firstName: separatedName[0],
            lastName: separatedName[separatedName.length - 1],
            email: userData.email,
            cpf: userData.cpf,
          });
        }
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde');
      });
  }, [user]);

  const handleSignUpFormSubmit = useCallback(
    async (data: IUpdateUserInfosFormData) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          firstName: Yup.string().required('Nome obrigatório'),
          lastName: Yup.string().required('Sobrenome obrigatório'),
          email: Yup.string()
            .email('Por favor insira um e-mail válido')
            .required('E-mail obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const userData = {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          cpf: data.cpf,
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
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
      setIsLoading(false);
    },
    [],
  );

  return (
    <StylesContainer>
      <SEO title="Minha conta" />
      <TopDashboardMenu setIsLoading={setIsLoading} />

      <Content>
        <LeftDashboardMenu />

        <ContentList>
          <div className="title">
            <h1>Informações pessoais</h1>
            <ButtonWithIcon
              type="button"
              icon={FiEdit2}
              onClick={() => setIsUserEditingFields(true)}
            >
              Editar informações
            </ButtonWithIcon>
          </div>

          <Form onSubmit={handleSignUpFormSubmit} ref={formRef}>
            <div className="inputs">
              <Input
                name="firstName"
                placeholder="Nome"
                label="Nome"
                icon={FiUser}
                disabled={!isUserEditingFields}
              />
              <Input
                name="lastName"
                placeholder="Sobrenome"
                label="Sobrenome"
                icon={FiUser}
                disabled={!isUserEditingFields}
              />
              <Input
                name="email"
                placeholder="E-mail"
                label="E-mail"
                icon={FiMail}
                disabled={!isUserEditingFields}
              />
              <Input
                name="cpf"
                placeholder="CPF"
                label="CPF"
                icon={FiCreditCard}
                disabled={!isUserEditingFields}
              />
            </div>

            {isUserEditingFields && (
              <ButtonWithIcon type="submit" isLoading={isLoading} icon={FiSave}>
                Salvar
              </ButtonWithIcon>
            )}
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
