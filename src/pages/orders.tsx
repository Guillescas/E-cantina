import { ReactElement, useEffect, useState } from 'react';

import BaseDashboard from '../components/BaseDashboard';
import OrderCard from '../components/OrderCard';
import { useAuth } from '../hooks/auth';

import { api } from '../services/apiClient';

import { StylesContainer } from '../styles/Pages/Orders';

interface IProductProps {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  urlImage: string;
}

interface IProductListProps {
  id: number;
  quantity: number;
  value: number;
  total: number;
  description: string;
  product: IProductProps;
}

interface IOrderProps {
  id: number;
  finished: boolean;
  createdAt: string;
  finishAt: string;
  observation: string;
  valid: boolean;
  total: number;
  productLists: IProductListProps[];
}

const Orders = (): ReactElement => {
  const { user } = useAuth();

  const [orders, setOrders] = useState<IOrderProps[]>([]);

  useEffect(() => {
    api.get(`/client/${user.sub}`).then(response => {
      console.log(response.data.orders);
      setOrders(response.data.orders);
    });
  }, [user]);

  return (
    <BaseDashboard>
      <StylesContainer>
        <h1>Meus pedidos</h1>
        <div className="orders">
          {orders.map(order => {
            if (!order.finished) {
              return (
                <OrderCard
                  key={order.id}
                  id={order.id}
                  orderAt={order.createdAt}
                  totalPrice={order.total}
                  productList={order.productLists}
                />
              );
            }
            return '';
          })}
        </div>

        <h2>Histórico</h2>
        <div className="orders">
          {orders.map(order => {
            if (order.finished) {
              return (
                <OrderCard
                  key={order.id}
                  id={order.id}
                  orderAt={order.createdAt}
                  totalPrice={order.total}
                  productList={order.productLists}
                />
              );
            }
            return '';
          })}
        </div>
      </StylesContainer>
    </BaseDashboard>
  );
};

export default Orders;
