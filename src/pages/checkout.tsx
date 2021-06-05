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

import Link from 'next/link';
import BaseDashboard from '../components/BaseDashboard';
import InputWithMask from '../components/Inputs/InputWithMask';
import Input from '../components/Inputs/Input';
import Button from '../components/Button';

import { withSSRAuth } from '../utils/withSSRAuth';
import getvalidationErrors from '../utils/getValidationErrors';

import { useCart } from '../hooks/cart';

import { StylesContainer } from '../styles/Pages/Checkout';
import { formatPrice } from '../utils/formatPriceToBR';
import ButtonWithIcon from '../components/ButtonWithIcon';

interface ICheckoutFormData {
  cardUserName: string;
  cardNumber: string;
  cardValidateDate: string;
  cardCVV: string;
}

const Checkout = (): ReactElement => {
  const { cart, totalCartPrice } = useCart();
  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleCheckoutSubmit = useCallback(
    async (data: ICheckoutFormData) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do restaurante obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(error);

          formRef.current?.setErrors(errors);
        }
      }
      setIsLoading(false);
    },
    [setIsLoading],
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
                  name="cardUserName"
                  icon={FiCalendar}
                  label="Data de validade"
                  placeholder="Data de validade"
                  mask="99/99"
                />
                <Input
                  name="cardUserName"
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
                  <td>{formatPrice(Number(0))}</td>
                </tr>
                <tr>
                  <th>Preço final:</th>
                  <td>{formatPrice(Number(totalCartPrice()))}</td>
                </tr>
              </table>

              <Button
                className="checkout-button"
                type="submit"
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
