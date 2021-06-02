/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FiTrash2 } from 'react-icons/fi';
import { IoTicket } from 'react-icons/io5';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Button from '../components/Button';
import CartQuantitySelector from '../components/CartQuantitySelector';
import Input from '../components/Inputs/Input';

import { withSSRAuth } from '../utils/withSSRAuth';
import { formatPrice } from '../utils/formatPriceToBR';
import getvalidationErrors from '../utils/getValidationErrors';

import { useCart } from '../hooks/cart';

import { StylesContainer, Content, CartContent } from '../styles/Pages/Cart';

interface IFormData {
  discountCoupon: string;
}

const Cart = (): ReactElement => {
  const { cart, removeProduct } = useCart();

  const formRef = useRef<FormHandles>(null);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const totalProductsPrice = cart.map(product => {
      return product.price * product.amount;
    });

    setTotalPrice(totalProductsPrice.reduce((a, b) => a + b, 0));
  }, [cart]);

  const handleDiscountCouponFormSubmit = async (data: IFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().email().required('E-mail obrigatório'),
        password: Yup.string()
          .min(8, 'A senha precisa ter no mínimo 8 caracteres')
          .required('Senha obrigatória'),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'As senhas não correspondem',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const userData = {
        discountCoupon: data.discountCoupon,
      };
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getvalidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  };

  return (
    <StylesContainer>
      <SEO title="Dashboard" />
      <TopDashboardMenu />

      <Content>
        <LeftDashboardMenu />

        <CartContent>
          <h1>Meu carrinho</h1>
          <div className="table-container">
            <table>
              <tr>
                <th />
                <th>Produto</th>
                <th>Observações</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Ação</th>
              </tr>
              {cart.map(cartItem => (
                <tr key={cartItem.id}>
                  <td>
                    <img src="/assets/hamburger.jpeg" alt="A" />
                  </td>
                  <td>{cartItem.name}</td>
                  <td>{cartItem.observation}</td>
                  <td>{formatPrice(cartItem.price)}</td>
                  <td>
                    <CartQuantitySelector product={cartItem} />
                  </td>
                  <td>
                    <ButtonWithIcon
                      icon={FiTrash2}
                      onClick={() => removeProduct(cartItem.cartItemId)}
                    >
                      Remover
                    </ButtonWithIcon>
                  </td>
                </tr>
              ))}
            </table>
          </div>

          <div className="resume">
            <div className="coupon-area">
              <h2>Inserir cupom de desconto</h2>
              <Form ref={formRef} onSubmit={handleDiscountCouponFormSubmit}>
                <Input
                  name="discountCoupon"
                  label="Insira seu cupom"
                  placeholder="Insira seu cupom"
                  icon={IoTicket}
                />

                <Button type="submit">Inserir</Button>
              </Form>
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
                  <td>{formatPrice(Number(totalPrice))}</td>
                </tr>
              </table>

              <Button
                className="checkout-button"
                onClick={() => router.push('/checkout')}
              >
                Ir para pagamento
              </Button>
            </div>
          </div>
        </CartContent>
      </Content>
    </StylesContainer>
  );
};

export default Cart;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
