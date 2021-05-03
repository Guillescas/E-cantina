import { ReactElement, useCallback, useRef } from 'react';
import Modal from 'react-modal';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';

import Input from '../Input';
import Button from '../Button';

import { StylesContainer } from './styles';
import Select from '../Select';

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
  const formRef = useRef<FormHandles>(null);

  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        // formRef.current?.setErrors({});

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
          // const errors = getValidationErrors(err);
          // formRef.current?.setErrors(errors);
          // return;
        }
      }
    },
    [],
    // [signIn, addToast, history],
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

        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <Select
              name="userType"
              id="userType"
              icon={FiUser}
              options={[
                {
                  optionValue: '',
                  optionLabel: 'Selecione uma opção',
                  disabled: true,
                  selected: true,
                },
                {
                  optionValue: 'client',
                  optionLabel: 'Cliente',
                  disabled: false,
                  selected: false,
                },
                {
                  optionValue: 'restaurant',
                  optionLabel: 'Restaurante',
                  disabled: false,
                  selected: false,
                },
                {
                  optionValue: 'manager',
                  optionLabel: 'Gestor',
                  disabled: false,
                  selected: false,
                },
              ]}
            />
          </div>

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

          <Button type="submit">Entrar</Button>
        </Form>

        <div className="login-links">
          <a>Criar uma conta</a>
          <a>Esqueci minha senha</a>
        </div>
      </StylesContainer>
    </Modal>
  );
};

export default SignModal;
