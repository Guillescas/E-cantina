import { ReactElement, useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
  FiArrowLeft,
  FiCalendar,
  FiHash,
  FiLock,
  FiUser,
} from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';

import BaseDashboard from '../components/BaseDashboard';
import InputWithMask from '../components/Inputs/InputWithMask';
import Input from '../components/Inputs/Input';
import Button from '../components/Button';

import { withSSRAuth } from '../utils/withSSRAuth';
import getvalidationErrors from '../utils/getValidationErrors';
import { formatPrice } from '../utils/formatPriceToBR';

import { useCart } from '../hooks/cart';
import { useAuth } from '../hooks/auth';

import { api } from '../services/apiClient';

import { StylesContainer } from '../styles/Pages/Checkout';

interface ICheckoutFormData {
  cardUserName: string;
  cardNumber: string;
  cardValidateDate: string;
  cardCVV: string;
}

const Checkout = (): ReactElement => {
  const { user } = useAuth();
  const { cart, totalCartPrice, discount, discountId, clearCart } = useCart();

  const router = useRouter();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleCheckoutSubmit = useCallback(
    async (data: ICheckoutFormData) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cardUserName: Yup.string().required('Nome no cartão obrigatório'),
          cardNumber: Yup.string().required('Número do cartão obrigatório'),
          cardValidateDate: Yup.string().required(
            'Data de validade do cartão obrigatória',
          ),
          cardCVV: Yup.string().required('CVV do cartão obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const orderData = {
          clientId: Number(user.sub),
          restaurantId: cart[0].restaurantId,
          discountId,
          observation: null,
          productList: cart.map(product => {
            return {
              productId: product.id,
              quantity: product.amount,
              description: product.observation,
            };
          }),
        };

        api
          .post('/order', orderData)
          .then(() => {
            toast.success('Pedido realizado com sucesso');
            router.push('/orders');
            clearCart();
          })
          .catch(error => {
            toast.error(error);
          });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(error);

          formRef.current?.setErrors(errors);
        }
      }
      setIsLoading(false);
    },
    [cart, clearCart, discountId, router, user.sub],
  );

  return (
    <BaseDashboard>
      <StylesContainer>
        <Link href="/cart">
          <div className="back-button">
            <FiArrowLeft />
            <p>Voltar</p>
          </div>
        </Link>

        <h1>Checkout</h1>
        <p>Para finalizar sua compra, insira os dados para pagamento abaixo</p>

        <Form ref={formRef} onSubmit={handleCheckoutSubmit}>
          <div className="resume">
            <div className="card-area">
              <h2>Dados do cartão</h2>
              <Input
                name="cardUserName"
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
                  name="cardValidateDate"
                  icon={FiCalendar}
                  label="Data de validade"
                  placeholder="Data de validade"
                  mask="99/99"
                />
                <Input
                  name="cardCVV"
                  icon={FiLock}
                  label="CVV"
                  placeholder="CVV"
                />
              </div>
            </div>

            <div>
              <h2>Resumo da compra</h2>

              <table>
                <tr>
                  <th>Total de itens:</th>
                  <td>{cart.length}</td>
                </tr>
                <tr>
                  <th>Desconto:</th>
                  <td>{formatPrice(Number(discount))}</td>
                </tr>
                <tr>
                  <th>Preço final:</th>
                  <td>{formatPrice(Number(totalCartPrice()))}</td>
                </tr>
              </table>

              <Button
                className="checkout-button"
                onClick={() => formRef.current.submitForm()}
                isLoading={isLoading}
              >
                Finalizar pedido
              </Button>
            </div>
          </div>
        </Form>
      </StylesContainer>
    </BaseDashboard>
  );
};

export default Checkout;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
