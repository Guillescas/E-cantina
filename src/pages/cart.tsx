/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { FiTrash2 } from 'react-icons/fi';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Button from '../components/Button';
import CartQuantitySelector from '../components/CartQuantitySelector';

import { withSSRAuth } from '../utils/withSSRAuth';
import { formatPrice } from '../utils/formatPriceToBR';

import { useCart } from '../hooks/cart';

import { StylesContainer, Content, CartContent } from '../styles/Pages/Cart';

const Cart = (): ReactElement => {
  const { cart, removeProduct } = useCart();

  const router = useRouter();

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

          <Button
            className="checkout-button"
            onClick={() => router.push('/checkout')}
          >
            Ir para pagamento
          </Button>
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
