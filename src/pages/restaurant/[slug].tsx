import { ReactElement, useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { AiTwotoneFire } from 'react-icons/ai';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';

import LeftDashboardMenu from '../../components/LeftDashboardMenu';
import ProductCard from '../../components/ProductCard';
import TopDashboardMenu from '../../components/TopDashboardMenu';
import VerticalProductCard from '../../components/VerticalProductCard';
import RateModal from '../../components/Modals/RateModal';

import { api } from '../../services/apiClient';

import { withSSRAuth } from '../../utils/withSSRAuth';

import {
  StylesContainer,
  Content,
  RestaurantContent,
} from '../../styles/Pages/Restaurant';

interface IRestaurantProps {
  id: number;
  email: string;
  name: string;
  description?: string;
  category: {
    id: number;
    name: string;
  };
  urlImage: string;
}

interface IProductProps {
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

interface IrestaurantUrlPropsProps {
  id: string;
}

const Restaurant = (
  restaurantUrlProps: IrestaurantUrlPropsProps,
): ReactElement => {
  const { id } = restaurantUrlProps;

  const [rateModalIsOpen, setRateModalIsOpen] = useState(false);

  const [restaurant, setRestaurant] = useState<IRestaurantProps>();
  const [products, setProducts] = useState<IProductProps[]>([]);
  const [rating, setRating] = useState<number>();

  const onRequestCloseRateModal = () => {
    setRateModalIsOpen(false);
  };

  useEffect(() => {
    api
      .get(`/restaurant/${id}`)
      .then(response => {
        setRating(response.data.averageRating);
        setRestaurant(response.data);
      })
      .catch(error => {
        return toast.error(error);
      });
  }, [id]);

  useEffect(() => {
    api
      .get(`/product?restaurantId=${id}`)
      .then(response => {
        setProducts(response.data.content);
      })
      .catch(error => {
        return toast.error(error);
      });
  }, [id]);

  const filledStars = [];
  const unfilledStars = [];

  for (let i = 1; i <= rating; i += 1) {
    filledStars.push(<FaStar size={20} />);
  }

  for (let m = 0; rating + m !== 5; m += 1) {
    unfilledStars.push(<FaRegStar size={20} />);
  }

  return (
    <StylesContainer>
      <RateModal
        isModalOpen={rateModalIsOpen}
        onRequestClose={onRequestCloseRateModal}
        restaurantId={Number(id)}
      />
      <TopDashboardMenu />

      <Content>
        <LeftDashboardMenu />

        <RestaurantContent>
          {restaurant && restaurant.urlImage ? (
            <img
              src={`http://localhost:8080${restaurant && restaurant.urlImage}`}
              alt={`Imagem de ${restaurant && restaurant.name}`}
            />
          ) : (
            <img
              src="/assets/restaurant.jpeg"
              alt={`Imagem de ${restaurant && restaurant.name}`}
            />
          )}

          <div className="main">
            <div className="title">
              <h1>{restaurant && restaurant.name}</h1>

              <div className="rating">
                <div>
                  {!rating && <p>Nenhuma avaliação disponível</p>}
                  <span>{rating && rating.toFixed(1)}</span>
                  {filledStars.map(star => star)}
                  {unfilledStars.map(star => star)}
                  {/* <FaStar size={20} />
                  <FaStarHalfAlt size={20} />
                  <FaRegStar size={20} /> */}
                </div>
                <button type="button" onClick={() => setRateModalIsOpen(true)}>
                  Avaliar restaurante
                </button>
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
                {products &&
                  products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      restaurantId={Number(id)}
                    />
                  ))}
              </div>
            </div>

            <div className="section products">
              <h1>Mais produtos</h1>
              <div className="vertical-cards">
                {products &&
                  products.map(product => (
                    <VerticalProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
          </div>
        </RestaurantContent>
      </Content>
    </StylesContainer>
  );
};

export default Restaurant;

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
