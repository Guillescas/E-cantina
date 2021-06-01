import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { ReactElement, useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import {
  FiCreditCard,
  FiDollarSign,
  FiHash,
  FiHome,
  FiImage,
  FiLock,
  FiMail,
  FiPlus,
} from 'react-icons/fi';
import { IoMdRestaurant } from 'react-icons/io';
import { BiRuler } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import InputWithMask from '../../components/Inputs/InputWithMask';
import TopMenu from '../../components/TopMenu';
import SignModal from '../../components/Modals/SignModal';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Button';
import SEO from '../../components/SEO';

import getValidationErrors from '../../utils/getValidationErrors';

import { useSignInModal } from '../../hooks/signinModal';

import { api } from '../../services/apiClient';

import { StylesContainer } from '../../styles/Pages/EstablishmentSignUp';

interface SignUpFormData {
  email: string;
  password: string;
  name: string;
  cep: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  cnpj: string;
  capacity: number;
  rent: number;
}

const EstablishmentSignUp = (): ReactElement => {
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
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'As senhas não correspondem')
            .required('Você precisa confirmar sua senha'),
          name: Yup.string().required('Nome do estabelecimento obrigatório'),
          cnpj: Yup.string()
            .max(18, 'O campo deve ter 14 dígitos')
            .min(18, 'O campo deve ter 14 dígitos')
            .required('CNPJ obrigatório'),
          capacity: Yup.number().required('Capacidade obrigatória'),
          cep: Yup.string().required('Cep obrigatório'),
          street: Yup.string().required('Rua obrigatória'),
          number: Yup.number().required('Número obrigatório'),
          neighborhood: Yup.string().required('Bairro obrigatório'),
          rent: Yup.number().required('Preço do aluguel obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const establishmentData = {
          email: data.email,
          password: data.password,
          name: data.name,
          cep: data.cep,
          street: data.street,
          number: data.number,
          complement: data.complement,
          neighborhood: data.neighborhood,
          cnpj: data.cnpj,
          capacity: data.capacity,
          rent: data.rent,
        };

        await api
          .post('/establishment', establishmentData)
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
      <SEO title="Cadastrar um estabelecimento" />
      <div>
        <TopMenu />

        <h1>Cadastre seu estabelecimento agora mesmo!</h1>

        <Form ref={formRef} onSubmit={handleSignUpFormSubmit}>
          <div className="first-section">
            <Input
              name="name"
              icon={IoMdRestaurant}
              label="Nome do estabelecimento"
              placeholder="Nome do estabelecimento"
            />
          </div>
          <div className="second-section">
            <div className="inputs">
              <Input
                name="email"
                icon={FiMail}
                label="E-mail do responsável"
                placeholder="E-mail do responsável"
              />
              <Input
                label="Senha"
                placeholder="Senha"
                name="password"
                icon={FiLock}
                type="password"
              />
              <Input
                label="Confirme sua senha"
                placeholder="Confirme sua senha"
                name="confirmPassword"
                icon={FiLock}
                type="password"
              />
              <InputWithMask
                name="cnpj"
                label="CNPJ"
                placeholder="CNPJ"
                icon={FiCreditCard}
                mask="99.999.999/9999-99"
              />
              <Input
                name="capacity"
                label="Capacidade do estabelecimento"
                placeholder="Capacidade do estabelecimento"
                icon={BiRuler}
                type="number"
              />
            </div>
            <div>
              <InputWithMask
                label="CEP"
                placeholder="CEP"
                name="cep"
                icon={FiHome}
                mask="99999-999"
              />
              <Input
                label="Endereço"
                placeholder="Endereço"
                name="street"
                icon={FiHome}
              />
              <Input
                label="Número"
                placeholder="Número"
                name="number"
                icon={FiHash}
                type="number"
              />
              <Input
                name="complement"
                icon={FiPlus}
                label="Complemento"
                placeholder="Complemento"
              />
              <Input
                name="neighborhood"
                icon={FiImage}
                label="Bairro"
                placeholder="Bairro"
              />
              <Input
                name="rent"
                icon={FiDollarSign}
                label="Preço do aluguel"
                placeholder="Preço do aluguel"
                type="number"
              />
            </div>
          </div>

          <Button type="submit" isLoading={isLoading}>
            Cadastrar restaurante
          </Button>
        </Form>
      </div>

      <img src="/assets/signup1.jpeg" alt="Imagem de comida" />
    </StylesContainer>
  );
};

export default EstablishmentSignUp;
