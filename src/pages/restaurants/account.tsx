import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  FiAlertCircle,
  FiAlignLeft,
  FiCreditCard,
  FiEdit2,
  FiLock,
  FiMail,
  FiSave,
  FiUser,
  FiX,
} from 'react-icons/fi';

import LeftDashboardMenu from '../../components/modules/Restaurant/LeftDashboardMenu';
import SEO from '../../components/SEO';
import TopDashboardMenu from '../../components/TopDashboardMenu';
import Input from '../../components/Inputs/Input';
import InputWithMask from '../../components/Inputs/InputWithMask';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import Button from '../../components/Button';
import Dropzone from '../../components/Inputs/Dropzone';

import { withSSRAuth } from '../../utils/withSSRAuth';
import getvalidationErrors from '../../utils/getValidationErrors';

import { api } from '../../services/apiClient';

import { useAuth } from '../../hooks/auth';

import {
  StylesContainer,
  Content,
  ContentList,
} from '../../styles/Pages/Account';

interface IUpdateUserInfosFormData {
  name: string;
  email: string;
  cnpj: string;
  description: string;
}

interface IUpdateUserImageFormData {
  image: any;
  password: string;
}

interface IUserResponse {
  email: string;
  name: string;
  type: string;
  cnpj: string;
  description: string;
}

const Account = (): ReactElement => {
  const { user, updateRestaurant, updateUserImage } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isUserEditingFields, setIsUserEditingFields] = useState(false);
  const [isUserUpdatingImage, setIsUserUpdatingImage] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState('');

  const formRef = useRef<FormHandles>(null);
  const uploadFileFormRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (!user.urlImage) {
      return setUserImageUrl('');
    }
    setUserImageUrl(user.urlImage);
  }, [user]);

  useEffect(() => {
    api
      .get(`/restaurant/${user?.sub}`)
      .then(response => {
        const userData: IUserResponse = response.data;

        if (!userData.cnpj) {
          formRef.current?.setData({
            name: userData.name,
            email: userData.email,
            cnpj: '',
            description: userData.description,
          });
        } else {
          formRef.current?.setData({
            name: userData.name,
            email: userData.email,
            cnpj: userData.cnpj,
            description: userData.description,
          });
        }
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde');
      });
  }, [user]);

  const handleUpdatePersonalInfoFormSubmit = useCallback(
    async (data: IUpdateUserInfosFormData) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Por favor insira um e-mail válido')
            .required('E-mail obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const userData = {
          name: data.name,
          email: data.email,
          cnpj: data.cnpj,
          description: data.description,
        };

        await updateRestaurant({
          dataOfUser: userData,
          setIsUserEditingFields,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }

      setIsLoading(false);
    },
    [updateRestaurant],
  );

  async function handleFileUpload(
    data: IUpdateUserImageFormData,
  ): Promise<void> {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append('image', data.image[0]);
      formData.append('userId', user.sub);

      uploadFileFormRef.current?.setErrors({});

      const schema = Yup.object().shape({
        image: Yup.mixed().required('Imagem obrigatória'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!data.image[0]) {
        toast.info('Você deve selecionar uma imagem para completar este passo');
        throw new Error();
      }

      api
        .post('http://localhost:8080/upload', formData, {
          headers: {
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundaryLl5fBkPZH3nO3InH',
          },
        })
        .then(response => {
          setTimeout(async () => {
            await updateUserImage({
              dataOfUser: response.data.urlImage,
              setIsUserUpdatingImage,
            });
          }, 1000);
        })
        .then(() => {
          toast.success('Imagem alterada com sucesso');
        })
        .catch(() => {
          toast.error('Erro inesperado. Tente novamente mais tarde', {
            toastId: 2,
          });
        });
      uploadFileFormRef.current.clearField('image');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getvalidationErrors(err);

        uploadFileFormRef.current?.setErrors(errors);
      }
    }

    setIsLoading(false);
  }

  return (
    <StylesContainer>
      <SEO title="Minha conta" />
      <TopDashboardMenu setIsLoading={setIsLoading} />

      <Content>
        <LeftDashboardMenu />

        <ContentList>
          <div className="title">
            <h1>Informações pessoais</h1>

            {isUserEditingFields ? (
              <>
                <ButtonWithIcon
                  type="button"
                  icon={FiSave}
                  isSuccess
                  onClick={() => formRef.current.submitForm()}
                >
                  Salvar
                </ButtonWithIcon>
                <ButtonWithIcon
                  type="button"
                  icon={FiX}
                  onClick={() => setIsUserEditingFields(false)}
                >
                  Cancelar
                </ButtonWithIcon>
              </>
            ) : (
              <ButtonWithIcon
                type="button"
                icon={FiEdit2}
                onClick={() => setIsUserEditingFields(true)}
              >
                Editar informações
              </ButtonWithIcon>
            )}
          </div>

          <Form onSubmit={handleUpdatePersonalInfoFormSubmit} ref={formRef}>
            <div className="inputs">
              <Input
                name="name"
                placeholder="Nome do restaurante"
                label="Nome do restaurante"
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
              <InputWithMask
                name="cnpj"
                placeholder="CNPJ"
                label="CNPJ"
                mask="99.999.999/9999-99"
                icon={FiCreditCard}
                disabled={!isUserEditingFields}
              />
              <Input
                name="description"
                placeholder="Descrição do restaurante"
                label="Descrição do restaurante"
                icon={FiAlignLeft}
                disabled={!isUserEditingFields}
              />
            </div>
          </Form>

          <p className="upload-image-p">Altere sua imagem de perfil aqui</p>
          <Form
            ref={uploadFileFormRef}
            onSubmit={handleFileUpload}
            className="file-upload-form"
          >
            <div className="dropzone-area">
              <Dropzone
                name="image"
                setIsUserUpdatingImage={setIsUserUpdatingImage}
              />

              {isUserUpdatingImage && (
                <div className="finish-update-container">
                  <span>
                    <FiAlertCircle size={18} />
                    Insira sua senha para salvar as alterações
                  </span>
                  <div className="finish-update-user-infos">
                    <Input
                      name="password"
                      type="password"
                      icon={FiLock}
                      label="Senha"
                      placeholder="Senha"
                    />

                    <Button type="submit" isLoading={isLoading}>
                      Salvar
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="user-image">
              {userImageUrl === '' ? (
                <FiUser />
              ) : (
                <img
                  src={`http://localhost:8080${userImageUrl}`}
                  alt={`Imagem de ${user && user.name}`}
                />
              )}
            </div>
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
