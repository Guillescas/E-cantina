import { ReactElement, useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { AiTwotoneFire } from 'react-icons/ai';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';

import LeftDashboardMenu from '../../components/LeftDashboardMenu';
import ProductCard from '../../components/ProductCard';
import TopDashboardMenu from '../../components/TopDashboardMenu';
import VerticalProductCard from '../../components/VerticalProductCard';

import { useAuth } from '../../hooks/auth';

import { api } from '../../services/apiClient';

import { withSSRAuth } from '../../utils/withSSRAuth';

import {
  StylesContainer,
  Content,
  ProductContent,
} from '../../styles/Pages/Product';

interface IRestaurantProps {
  id: number;
  email: string;
  name: string;
  description?: string;
  category: {
    id: number;
    name: string;
  };
}

interface IrestaurantUrlPropsProps {
  id: string;
}

const Product = (
  restaurantUrlProps: IrestaurantUrlPropsProps,
): ReactElement => {
  const { token, signOut } = useAuth();
  const { id } = restaurantUrlProps;

  const [restaurant, setRestaurant] = useState<IRestaurantProps>();

  useEffect(() => {
    api
      .get(`/restaurant/${id}`)
      .then(response => {
        setRestaurant(response.data);
      })
      .catch(error => {
        return toast.error(error);
      });
  }, [id, signOut, token]);

  return (
    <StylesContainer>
      <TopDashboardMenu />

      <Content>
        <LeftDashboardMenu />

        <ProductContent>
          <img src="/assets/restaurant.jpeg" alt="Imagem de" />

          <div className="main">
            <div className="title">
              <h1>{restaurant && restaurant.name}</h1>

              <div className="rating">
                <span>3.7</span>
                <FaStar size={20} />
                <FaStar size={20} />
                <FaStarHalfAlt size={20} />
                <FaRegStar size={20} />
                <FaRegStar size={20} />
              </div>
            </div>

            <div className="description">
              <p>{restaurant && restaurant.description}</p>
            </div>

            <div className="section hot-sale">
              <h1>
                Promoção <AiTwotoneFire />
              </h1>
              <div className="cards">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
            </div>

            <div className="section products">
              <h1>Mais produtos</h1>
              <div className="vertical-cards">
                <VerticalProductCard />
              </div>
            </div>
          </div>
        </ProductContent>
      </Content>
    </StylesContainer>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async ({ params }: any) => {
    const { slug } = params;

    return {
      props: {
        id: slug,
      },
    };
  },
);
