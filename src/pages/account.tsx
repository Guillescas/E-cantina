import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  FiAlertCircle,
  FiCalendar,
  FiCreditCard,
  FiEdit2,
  FiHash,
  FiLock,
  FiMail,
  FiPlus,
  FiSave,
  FiTag,
  FiUser,
  FiX,
} from 'react-icons/fi';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';
import Input from '../components/Inputs/Input';
import InputWithMask from '../components/Inputs/InputWithMask';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Button from '../components/Button';
import Dropzone from '../components/Inputs/Dropzone';
import CreditCard from '../components/CreditCard';

import { withSSRAuth } from '../utils/withSSRAuth';
import getvalidationErrors from '../utils/getValidationErrors';

import { api } from '../services/apiClient';

import { useAuth } from '../hooks/auth';

import { StylesContainer, Content, ContentList } from '../styles/Pages/Account';

interface IUpdateUserInfosFormData {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
}

interface IUpdateUserImageFormData {
  image: any;
  password: string;
}

interface IUserResponse {
  email: string;
  name: string;
  type: string;
  cpf: string;
}

interface IAddCreditCardFormData {
  nickname: string;
  owner: string;
  cardNumber: string;
  validThru: string;
  cvv: string;
  cpfClient: string;
}

interface ICreditCardData {
  id: number;
  nickname: string;
  owner: string;
  cardNumber: string;
  validThru: string;
  cvv: string;
}

const Account = (): ReactElement => {
  const { user, updateUser, updateUserImage } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isUserEditingFields, setIsUserEditingFields] = useState(false);
  const [isUserUpdatingImage, setIsUserUpdatingImage] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState('');

  const [isUserAddingCreditCard, setIsUserAddingCreditCard] = useState(false);
  const [userCreditCards, setUserCreditCards] = useState<ICreditCardData[]>([]);

  const formRef = useRef<FormHandles>(null);
  const uploadFileFormRef = useRef<FormHandles>(null);
  const addCreditCardFormRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (!user.urlImage) {
      return setUserImageUrl('');
    }
    setUserImageUrl(user.urlImage);
  }, [user]);

  useEffect(() => {
    api
      .get(`/client/${user?.sub}`)
      .then(response => {
        const userData: IUserResponse = response.data;

        const separatedName = userData.name.split(' ');
        const formattedFirstName = separatedName[0];
        const formattedLastName = separatedName
          .filter(name => name !== separatedName[0])
          .toString()
          .replaceAll(',', ' ');

        if (!userData.cpf) {
          formRef.current?.setData({
            firstName: formattedFirstName,
            lastName: formattedLastName,
            email: userData.email,
            cpf: '',
          });
        } else {
          formRef.current?.setData({
            firstName: formattedFirstName,
            lastName: formattedLastName,
            email: userData.email,
            cpf: userData.cpf,
          });
        }

        setUserCreditCards(response.data.cards);
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde');
      });
  }, [user, updateUser]);

  const handleUpdatePersonalInfoFormSubmit = useCallback(
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

        await updateUser({ dataOfUser: userData, setIsUserEditingFields });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }

      setIsLoading(false);
    },
    [updateUser],
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

  const handleAddCreditCard = useCallback(
    async (data: IAddCreditCardFormData) => {
      setIsLoading(true);
      try {
        addCreditCardFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nickname: Yup.string().required('Apelido obrigatório'),
          owner: Yup.string().required('Nome no cartão obrigatório'),
          cardNumber: Yup.string().required('Número do cartão obrigatório'),
          validThru: Yup.string().required(
            'Data de validade do cartão obrigatória',
          ),
          cvv: Yup.string().required('CVV do cartão obrigatório'),
          cpfClient: Yup.string().required('CPF do titular obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const creditCardData = {
          nickname: data.nickname,
          owner: data.owner,
          cardNumber: data.cardNumber.replaceAll('-', ''),
          validThru: `28/${data.validThru.slice(
            0,
            -3,
          )}/20${data.validThru.slice(-2)}`,
          cvv: data.cvv,
          bank: data.nickname,
          cpfClient: data.cpfClient,
        };

        api
          .post('/card', creditCardData)
          .then(() => {
            toast.success('Cartão adicionado com sucesso');
            addCreditCardFormRef.current.reset();
          })
          .catch(error => {
            return toast.error(error.response.message);
          });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(error);

          addCreditCardFormRef.current?.setErrors(errors);
        }
      }
      setIsUserAddingCreditCard(false);
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
                name="firstName"
                placeholder="Primeiro nome"
                label="Primeiro nome"
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
              <InputWithMask
                name="cpf"
                placeholder="CPF"
                label="CPF"
                mask="999.999.999-99"
                icon={FiCreditCard}
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

          <div className="card-title">
            <h1>Informações sobre pagamento</h1>

            {isUserAddingCreditCard ? (
              <>
                <ButtonWithIcon
                  type="button"
                  icon={FiSave}
                  isSuccess
                  onClick={() => addCreditCardFormRef.current.submitForm()}
                >
                  Salvar
                </ButtonWithIcon>
                <ButtonWithIcon
                  type="button"
                  icon={FiX}
                  onClick={() => setIsUserAddingCreditCard(false)}
                >
                  Cancelar
                </ButtonWithIcon>
              </>
            ) : (
              <ButtonWithIcon
                type="button"
                icon={FiPlus}
                onClick={() => setIsUserAddingCreditCard(true)}
              >
                Adicionar cartão
              </ButtonWithIcon>
            )}
          </div>

          <div className="card-content">
            <div className="cards">
              {userCreditCards.map(userCreditCard => (
                <CreditCard
                  key={userCreditCard.id}
                  id={userCreditCard.id}
                  nickname={userCreditCard.nickname}
                  cardNumber={userCreditCard.cardNumber}
                />
              ))}
            </div>

            {isUserAddingCreditCard && (
              <Form onSubmit={handleAddCreditCard} ref={addCreditCardFormRef}>
                <div className="card-area">
                  <h2>Dados do cartão</h2>
                  <Input
                    name="nickname"
                    icon={FiTag}
                    label="Apelido do cartão"
                    placeholder="Apelido do cartão"
                  />
                  <InputWithMask
                    name="cpfClient"
                    icon={FiCreditCard}
                    label="CPF do titular do cartão"
                    placeholder="CPF do titular do cartão"
                    mask="999.999.999-99"
                  />
                  <Input
                    name="owner"
                    icon={FiUser}
                    label="Nome no cartão"
                    placeholder="Nome no cartão"
                    isInUppercase
                  />
                  <InputWithMask
                    name="cardNumber"
                    icon={FiHash}
                    label="Número no cartão"
                    placeholder="Número no cartão"
                    mask="9999-9999-9999-9999"
                  />
                  <div className="inline-inputs">
                    <InputWithMask
                      name="validThru"
                      icon={FiCalendar}
                      label="Data de validade"
                      placeholder="Data de validade"
                      mask="99/99"
                    />
                    <Input
                      name="cvv"
                      icon={FiLock}
                      label="CVV"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              </Form>
            )}
          </div>
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
