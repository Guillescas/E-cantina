import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaRegStar, FaStar } from 'react-icons/fa';

import LeftDashboardMenu from '../../components/modules/Restaurant/LeftDashboardMenu';
import Loading from '../../components/Loading';
import SEO from '../../components/SEO';
import TopDashboardMenu from '../../components/modules/Restaurant/TopDashboardMenu';

import { api } from '../../services/apiClient';

import { withSSRAuth } from '../../utils/withSSRAuth';

import { useSearchRestaurantBy } from '../../hooks/searchRestaurantBy';
import { useAuth } from '../../hooks/auth';

import {
  StylesContainer,
  Content,
  ContentList,
} from '../../styles/Pages/Restaurants/Dashboard';

const Dashboard = (): ReactElement => {
  const { user } = useAuth();
  const { setRestaurants, category } = useSearchRestaurantBy();

  const [isLoading, setIsLoading] = useState(false);
  const [restaurantRating, setRestaurantRating] = useState<number>();
  const [totalOrders, setTotalOrders] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/restaurant/${user.sub}`)
      .then(response => {
        setRestaurantRating(response.data.averageRating);
        setIsLoading(false);
      })
      .catch(() => {
        return toast.error('Houve um erro inesperado. Tente mais tarde');
      });
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/restaurant?nameCategory=${category}`)
      .then(response => {
        setIsLoading(false);
        setRestaurants(response.data.content);
      })
      .catch(() => {
        return toast.error('Houve um erro inesperado. Tente mais tarde');
      });
  }, [category, setRestaurants]);

  return (
    <StylesContainer>
      <SEO title="Dashboard" />

      <TopDashboardMenu />

      <Content>
        <LeftDashboardMenu />

        <ContentList>
          {isLoading && (
            <div className="loading">
              <Loading />
            </div>
          )}

          <div className="statistcs">
            <section className="orders-quantity">
              <p>Total de pedidos</p>
              {totalOrders.length}
            </section>
            <section className="rating">
              <p>Avaliação do restaurante</p>
              <div className="rating">
                {!restaurantRating && <p>Nenhuma avaliação disponível</p>}
                <span>{restaurantRating && restaurantRating.toFixed(1)}</span>
                {restaurantRating &&
                  restaurantRating >= 1 &&
                  restaurantRating < 2 && (
                    <>
                      <FaStar size={20} />
                      <FaRegStar size={20} />
                      <FaRegStar size={20} />
                      <FaRegStar size={20} />
                      <FaRegStar size={20} />
                    </>
                  )}
                {restaurantRating &&
                  restaurantRating >= 2 &&
                  restaurantRating < 3 && (
                    <>
                      <FaStar size={20} />
                      <FaStar size={20} />
                      <FaRegStar size={20} />
                      <FaRegStar size={20} />
                      <FaRegStar size={20} />
                    </>
                  )}
                {restaurantRating &&
                  restaurantRating >= 3 &&
                  restaurantRating < 4 && (
                    <>
                      <FaStar size={20} />
                      <FaStar size={20} />
                      <FaStar size={20} />
                      <FaRegStar size={20} />
                      <FaRegStar size={20} />
                    </>
                  )}
                {restaurantRating &&
                  restaurantRating >= 4 &&
                  restaurantRating < 5 && (
                    <>
                      <FaStar size={20} />
                      <FaStar size={20} />
                      <FaStar size={20} />
                      <FaStar size={20} />
                      <FaRegStar size={20} />
                    </>
                  )}
                {restaurantRating &&
                  restaurantRating >= 5 &&
                  restaurantRating <= 6 && (
                    <>
                      <FaStar size={20} />
                      <FaStar size={20} />
                      <FaRegStar size={20} />
                      <FaRegStar size={20} />
                      <FaRegStar size={20} />
                    </>
                  )}
              </div>
            </section>
          </div>
        </ContentList>
      </Content>
    </StylesContainer>
  );
};

export default Dashboard;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
