import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { ReactElement, useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import {
  FiAlignLeft,
  FiCreditCard,
  FiHome,
  FiList,
  FiLock,
  FiMail,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { IoMdRestaurant } from 'react-icons/io';
import InputWithMask from '../../components/InputWithMask';
import Select from '../../components/Select';
import TopMenu from '../../components/TopMenu';
import SignModal from '../../components/SignModal';
import Input from '../../components/Input';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import SEO from '../../components/SEO';

import getValidationErrors from '../../utils/getValidationErrors';

import { useSignInModal } from '../../hooks/signinModal';

import api from '../../services/api';

import { StylesContainer } from '../../styles/Pages/RestaurantSignUp';

interface SignUpFormData {
  email: string;
  password: string;
  name: string;
  establishmentName: string;
  cnpj: string;
  category: string;
  description: string;
}

const SignUpRestaurant = (): ReactElement => {
  const router = useRouter();

  const { loginModalIsOpen, closeLoginModal } = useSignInModal();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpFormSubmit = useCallback(
    async (data: SignUpFormData) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string()
            .min(8, 'A senha precisa ter no mínimo 8 caracteres')
            .required('Senha obrigatória'),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não correspondem',
          ),
          name: Yup.string().required('Nome obrigatório'),
          cnpj: Yup.string()
            .max(18, 'O campo deve ter 14 dígitos')
            .min(18, 'O campo deve ter 14 dígitos')
            .required('CNPJ obrigatório'),
          category: Yup.string().required('Categoria obrigatória'),
          description: Yup.string().required('Descrição obrigatória'),
          establishmentName: Yup.string().required(
            'Nome do estabelecimento obrigatório',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const restaurantData = {
          email: data.email,
          password: data.password,
          name: data.name,
          cnpj: data.cnpj,
          category: data.category,
          description: data.description,
          establishmentName: data.establishmentName,
        };

        await api
          .post('/restaurant', restaurantData)
          .then(response => {
            if (!response.data) {
              return toast.error('Erro ao cadastrar o restaurante');
            }

            toast.success('Cadastro realizado com sucesso');
            router.push('/');
          })
          .catch(error => {
            return toast.error(
              `Erro inesperado. Tente novamente mais tarde. ${error}`,
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
      <SEO title="Cadastrar um restaurante" />
      <div>
        <TopMenu />

        <h1>Cadastre seu restaurante agora mesmo!</h1>

        <Form ref={formRef} onSubmit={handleSignUpFormSubmit}>
          <div className="first-section">
            <div>
              <Input
                name="email"
                icon={FiMail}
                label="E-mail do responsável"
                placeholder="E-mail do responsável"
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
            </div>
            <div>
              <Input
                name="name"
                icon={IoMdRestaurant}
                label="Nome do restaurante"
                placeholder="Nome do restaurante"
              />
              <Select
                name="establishmentName"
                icon={FiHome}
                label="Nome do estabelecimento"
                placeholder="Nome do estabelecimento"
                options={[]}
              />
              <InputWithMask
                name="cnpj"
                label="CNPJ"
                placeholder="CNPJ"
                icon={FiCreditCard}
                mask="99.999.999/9999-99"
              />
              <Select
                name="category"
                label="Qual a categoria do restaurante?"
                placeholder="Qual a categoria do restaurante?"
                icon={FiList}
                options={[
                  {
                    optionLabel: 'Selecione uma opção',
                    optionValue: '',
                    disabled: true,
                    selected: true,
                    hidden: true,
                  },
                  {
                    optionLabel: 'Lanches',
                    optionValue: 'lanches',
                    disabled: false,
                    selected: false,
                  },
                  {
                    optionLabel: 'Pizzaria',
                    optionValue: 'pizzaria',
                    disabled: false,
                    selected: false,
                  },
                  {
                    optionLabel: 'Japonês',
                    optionValue: 'japones',
                    disabled: false,
                    selected: false,
                  },
                  {
                    optionLabel: 'Vegetariano',
                    optionValue: 'vegetariano',
                    disabled: false,
                    selected: false,
                  },
                  {
                    optionLabel: 'Brasileiro',
                    optionValue: 'brasileiro',
                    disabled: false,
                    selected: false,
                  },
                  {
                    optionLabel: 'Bebidas',
                    optionValue: 'bebidas',
                    disabled: false,
                    selected: false,
                  },
                  {
                    optionLabel: 'Outro',
                    optionValue: 'outro',
                    disabled: false,
                    selected: false,
                  },
                ]}
              />
            </div>
          </div>
          <div className="second-section">
            <TextArea
              name="description"
              icon={FiAlignLeft}
              label="Descrição do restaurante"
              placeholder="Descrição do restaurante"
            />
          </div>

          <Button type="submit" isLoading={isLoading}>
            Cadastrar-me
          </Button>
        </Form>
      </div>

      <img src="/assets/signup1.jpeg" alt="Imagem de comida" />
    </StylesContainer>
  );
};

export default SignUpRestaurant;
