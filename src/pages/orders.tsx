import { ReactElement } from 'react';

import BaseDashboard from '../components/BaseDashboard';

import { StylesContainer } from '../styles/Pages/Orders';

const Orders = (): ReactElement => {
  return (
    <BaseDashboard>
      <h1>Meus pedidos</h1>
    </BaseDashboard>
  );
};

export default Orders;
