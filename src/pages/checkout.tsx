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

const Checkout = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  const [quantity, setQuantity] = useState(1);

  return (
    <StylesContainer>
      <SEO title="Dashboard" />
      <TopDashboardMenu />

      <Content>
        <LeftDashboardMenu />

        <CartContent>
          <h1>Finalizar compra</h1>

          <Button className="checkout-button">Finalizar</Button>
        </CartContent>
      </Content>
    </StylesContainer>
  );
};

export default Checkout;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
