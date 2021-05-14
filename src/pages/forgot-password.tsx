import { ReactElement, useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import TopMenu from '../components/TopMenu';

import getvalidationErrors from '../utils/getValidationErrors';

import { StylesContainer } from '../styles/Pages/ForgotPassword';

interface IForgotPasswordFormData {
  email: string;
}

const ForgotPassword = (): ReactElement => {
  const formRef = useRef<FormHandles>();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (data: IForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      toast.success('E-mail enviado com sucesso');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getvalidationErrors(error);

        formRef.current.setErrors(errors);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <StylesContainer>
      <TopMenu />

      <div>
        <h1>Esqueceu sua senha?</h1>
        <h2>Não se preocupe, estamos aqui para te ajudar :)</h2>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" placeholder="E-mail" icon={FiMail} />

          <Button type="submit" isLoading={isLoading}>
            Enviar
          </Button>
        </Form>
      </div>
    </StylesContainer>
  );
};

export default ForgotPassword;
