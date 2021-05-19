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
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import InputWithMask from '../../components/InputWithMask';
import TopMenu from '../../components/TopMenu';
import SignModal from '../../components/SignModal';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { useSignInModal } from '../../hooks/signinModal';

import api from '../../services/api';

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
      <div>
        <TopMenu />

        <h1>Cadastre seu estabelecimento agora mesmo!</h1>

        <Form ref={formRef} onSubmit={handleSignUpFormSubmit}>
          <div className="first-section">
            <Input
              name="name"
              icon={IoMdRestaurant}
              placeholder="Nome do estabelecimento"
            />
          </div>
          <div className="second-section">
            <div>
              <Input
                name="email"
                icon={FiMail}
                placeholder="E-mail do responsável"
              />
              <Input
                name="password"
                icon={FiLock}
                placeholder="Senha"
                type="password"
              />
              <Input
                name="confirmPassword"
                icon={FiLock}
                placeholder="Confirme sua senha"
                type="password"
              />
              <InputWithMask
                name="cnpj"
                placeholder="CNPJ"
                icon={FiCreditCard}
                mask="99.999.999/9999-99"
              />
              <Input
                name="capacity"
                placeholder="Capacidade do estabelecimento"
                icon={FiCreditCard}
                type="number"
              />
            </div>
            <div>
              <InputWithMask
                name="cep"
                icon={FiHome}
                placeholder="CEP"
                mask="99999-999"
              />
              <Input name="street" icon={FiHome} placeholder="Endereço" />
              <Input
                name="number"
                icon={FiHash}
                placeholder="Número"
                type="number"
              />
              <Input name="complement" icon={FiPlus} placeholder="Complement" />
              <Input name="neighborhood" icon={FiImage} placeholder="Bairro" />
              <Input
                name="rent"
                icon={FiDollarSign}
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
