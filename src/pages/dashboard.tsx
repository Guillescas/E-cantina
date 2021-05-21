import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import Loading from '../components/Loading';
import RestaurantCard from '../components/RestaurantCard';
import SearchByTypeCard from '../components/SearchByTypeCard';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';

import { useAuth } from '../hooks/auth';

import api from '../services/api';

import {
  StylesContainer,
  Content,
  ContentList,
} from '../styles/Pages/Dashboard';

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

const Dashboard = (): ReactElement => {
  const { token, signOut } = useAuth();

  const [restaurants, setRestaurants] = useState<IRestaurantProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api
      .get('/restaurant', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setRestaurants(response.data.content);
      })
      .catch(error => {
        return toast.error(error);
      });
  }, [signOut, token]);

  return (
    <StylesContainer>
      <SEO title="Dashboard" />
      <TopDashboardMenu setIsLoading={setIsLoading} />

      <Content>
        <LeftDashboardMenu />

        <ContentList>
          <div className="categories">
            <SearchByTypeCard
              categoryName="Lanches"
              imagePath="hamburger.jpeg"
            />
            <SearchByTypeCard categoryName="Japonês" imagePath="japa.jpeg" />
            <SearchByTypeCard
              categoryName="Vegetariana"
              imagePath="vegan.jpeg"
            />
            <SearchByTypeCard
              categoryName="Brasileira"
              imagePath="brasiliam.jpeg"
            />
            <SearchByTypeCard categoryName="Bebidas" imagePath="drink.jpeg" />
          </div>

          {isLoading && (
            <div className="loading">
              <Loading />
            </div>
          )}

          {restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              description={restaurant.description}
            />
          ))}
        </ContentList>
      </Content>
    </StylesContainer>
  );
};

export default Dashboard;
