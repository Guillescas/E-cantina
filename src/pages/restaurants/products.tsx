import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
  FiArrowLeft,
  FiCalendar,
  FiCreditCard,
  FiHash,
  FiLock,
  FiPlus,
  FiSave,
  FiTag,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';

import BaseDashboard from '../../components/modules/Restaurant/BaseDashboard';
import InputWithMask from '../../components/Inputs/InputWithMask';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Button';
import SelectCreditCard from '../../components/SelectCreditCard';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import ProductCard from '../../components/modules/Restaurant/ProductCard';

import { withSSRAuth } from '../../utils/withSSRAuth';
import getvalidationErrors from '../../utils/getValidationErrors';
import { formatPrice } from '../../utils/formatPriceToBR';

import { useCart } from '../../hooks/cart';
import { useAuth } from '../../hooks/auth';

import { api } from '../../services/apiClient';

import { StylesContainer } from '../../styles/Pages/Restaurants/Products';

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

interface IProduct {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
  urlImage?: string;
  amount: number;
  observation?: string;
  cartItemId: number;
}

const Products = (): ReactElement => {
  const { user } = useAuth();

  const createProducFormRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUserAddingProduct, setIsUserAddingProduct] = useState(false);

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    api
      .get(`/restaurant/${user.sub}`)
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  }, [user]);

  return (
    <BaseDashboard>
      <StylesContainer>
        <h1>Produtos</h1>

        <div className="section hot-sale">
          <h1>Promoção</h1>
          <div className="cards">
            {products &&
              products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  restaurantId={user && Number(user.sub)}
                />
              ))}
          </div>
        </div>
      </StylesContainer>
    </BaseDashboard>
  );
};

export default Products;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
