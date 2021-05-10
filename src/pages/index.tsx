import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import Modal from 'react-modal';

import Button from '../components/Button';
import Input from '../components/Input';
import TopMenu from '../components/TopMenu';

import getValidationErrors from '../utils/getValidationErrors';

import { StylesContainer, Content } from '../styles/Pages/Index';
import SignModal from '../components/SignModal';

interface SignInFormData {
  email: string;
  password: string;
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const loginFormRef = useRef<FormHandles>(null);

  const [isWhiteBoxOpen, setIsWhiteBoxOpen] = useState(false);
  const [registerOption, setRegisterOption] = useState('');

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSignUpFormSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        cpf: Yup.string()
          .max(14, 'O campo deve ter 11 dígitos')
          .min(14, 'O campo deve ter 11 dígitos')
          .required('CPF obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
        confirmPassword: Yup.string().min(
          6,
          'A senha deve ter no mínimo 6 dígitos',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (registerOption === 'investidor') {
        // await signIn({
        //   email: data.email,
        //   password: data.password,
        // });
      }

      if (registerOption === 'tomador') {
        // await signIn({
        //   email: data.email,
        //   password: data.password,
        // });
      }

      // history.push("/dashboard");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // await signIn({
      //   email: data.email,
      //   password: data.password,
      // });

      // history.push("/dashboard");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        loginFormRef.current?.setErrors(errors);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StylesContainer>
      <SignModal isModalOpen={modalIsOpen} onRequestClose={closeModal} />

      <Content>
        <TopMenu
          openWhiteBox={setIsWhiteBoxOpen}
          isWhiteBoxOpen={isWhiteBoxOpen}
          setRegisterOption={setRegisterOption}
          openModal={openModal}
        />
      </Content>
    </StylesContainer>
  );
};

export default Home;
