import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { ReactElement, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import {
  FiAlignLeft,
  FiCreditCard,
  FiList,
  FiLock,
  FiMail,
  FiUser,
} from 'react-icons/fi';

import InputWithMask from '../../components/InputWithMask';
import Select from '../../components/Select';
import TopMenu from '../../components/TopMenu';
import SignModal from '../../components/SignModal';

import getValidationErrors from '../../utils/getValidationErrors';

import { useSignInModal } from '../../hooks/signinModal';

import { StylesContainer } from '../../styles/Pages/SignUp';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  email: string;
  password: string;
  name: string;
  cnpj: string;
}

const SignUpRestaurant = (): ReactElement => {
  const { loginModalIsOpen, closeLoginModal } = useSignInModal();

  const formRef = useRef<FormHandles>(null);

  const handleSignUpFormSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().email().required('E-mail obrigatório'),
        cnpj: Yup.string()
          .max(18, 'O campo deve ter 14 dígitos')
          .min(18, 'O campo deve ter 14 dígitos')
          .required('CNPJ obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
        confirmPassword: Yup.string().min(
          6,
          'A senha deve ter no mínimo 6 dígitos',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // history.push("/dashboard");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StylesContainer>
      <SignModal
        isModalOpen={loginModalIsOpen}
        onRequestClose={closeLoginModal}
      />
      <div>
        <TopMenu />

        <h1>Cadastre seu restaurante agora mesmo!</h1>

        <Form ref={formRef} onSubmit={handleSignUpFormSubmit}>
          <div className="inputs">
            <div>
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
                name="password"
                icon={FiLock}
                placeholder="Senha"
                type="password"
              />
              <Input name="name" icon={FiUser} placeholder="Nome completo" />
            </div>
            <div>
              <InputWithMask
                name="cnpj"
                placeholder="CNPJ"
                icon={FiCreditCard}
                mask="99.999.999/9999-99"
              />
              <Select
                name="type"
                icon={FiList}
                options={[
                  {
                    optionLabel: 'Selecione uma opção',
                    optionValue: '',
                    selected: true,
                    disabled: true,
                  },
                  {
                    optionLabel: 'Lanchonete',
                    optionValue: 'lanchonete',
                    selected: false,
                    disabled: false,
                  },
                ]}
              />
              <Input
                name="description"
                icon={FiAlignLeft}
                placeholder="Descrição do restaurante"
              />
            </div>
          </div>

          <Button type="submit">Cadastrar-me</Button>
        </Form>
      </div>

      <img src="/assets/signup1.jpeg" alt="Imagem de comida" />
    </StylesContainer>
  );
};

export default SignUpRestaurant;
