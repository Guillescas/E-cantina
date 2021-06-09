/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactElement, useRef } from 'react';
import { useRouter } from 'next/router';
import { FiInfo, FiTrash2 } from 'react-icons/fi';
import { IoTicket } from 'react-icons/io5';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

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

import { api } from '../services/apiClient';

import { StylesContainer, Content, CartContent } from '../styles/Pages/Cart';

interface IFormData {
  discountCoupon: string;
}

const Cart = (): ReactElement => {
  const {
    cart,
    removeProduct,
    totalCartPrice,
    discount,
    setDiscount,
    setDiscountId,
  } = useCart();

  const formRef = useRef<FormHandles>(null);

  const router = useRouter();

  const handleDiscountCouponFormSubmit = async (data: IFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        discountCoupon: Yup.string().required('Cupom obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      api
        .get(`/discount/${data.discountCoupon}`)
        .then(response => {
          setDiscountId(response.data.id);
          setDiscount(response.data.value);

          toast.success('Cupom adicionado com sucesso');
          formRef.current.clearField('discountCoupon');
        })
        .catch(() => {
          // toast.error('Erro ao verificar cupom. Tente mais tarde');
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getvalidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  };

  return (
    <StylesContainer>
      <SEO title="Carrinho" />
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
                  <td className="image">
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
                  isInUppercase
                />

                <div className="discount-info">
                  <FiInfo />
                  <p>Você só pode usar um cupom por compra.</p>
                </div>

                <Button type="submit" isDisabled={cart.length < 1}>
                  Inserir
                </Button>
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
                  <td>{formatPrice(Number(totalCartPrice(discount)))}</td>
                </tr>
              </table>

              <Button
                className="checkout-button"
                onClick={() => router.push('/checkout')}
                isDisabled={cart.length < 1}
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
