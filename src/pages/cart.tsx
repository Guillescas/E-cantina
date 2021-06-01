/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactElement, useState } from 'react';

import { FiTrash2 } from 'react-icons/fi';
import LeftDashboardMenu from '../components/LeftDashboardMenu';
import Loading from '../components/Loading';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';

import { withSSRAuth } from '../utils/withSSRAuth';

import { StylesContainer, Content, CartContent } from '../styles/Pages/Cart';
import QuantitySelector from '../components/QuantitySelector';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Button from '../components/Button';

const Cart = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  const [quantity, setQuantity] = useState(1);

  return (
    <StylesContainer>
      <SEO title="Dashboard" />
      <TopDashboardMenu />

      <Content>
        <LeftDashboardMenu />

        <CartContent>
          <h1>Meu carrinho</h1>

          <table>
            <tr>
              <th />
              <th>Produto</th>
              <th>Observações</th>
              <th>Quantidade</th>
              <th>Ação</th>
            </tr>
            <tr>
              <td>
                <img src="/assets/hamburger.jpeg" alt="A" />
              </td>
              <td>Alfreds Futterkiste</td>
              <td>
                Alfreds Futterkiste asdyg asdy gaosudg asudog asodug oduaydg{' '}
              </td>
              <td>
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </td>
              <td>
                <ButtonWithIcon icon={FiTrash2}>Remover</ButtonWithIcon>
              </td>
            </tr>
          </table>

          <Button className="checkout-button">Ir para pagamento</Button>
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
