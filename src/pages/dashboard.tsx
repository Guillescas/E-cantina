import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import Loading from '../components/Loading';
import RestaurantCard from '../components/RestaurantCard';
import SearchByTypeCard from '../components/SearchByTypeCard';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';

import { api } from '../services/apiClient';

import { withSSRAuth } from '../utils/withSSRAuth';

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
  const [restaurants, setRestaurants] = useState<IRestaurantProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api
      .get('/restaurant')
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.content);
      })
      .catch(error => {
        return toast.error(error);
      });
  }, []);

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
              color="db5a40"
            />
            <SearchByTypeCard
              categoryName="Japonês"
              imagePath="japa.jpeg"
              color="8C52FF"
            />
            <SearchByTypeCard
              categoryName="Vegetariana"
              imagePath="vegan.jpeg"
              color="7ED957"
            />
            <SearchByTypeCard
              categoryName="Brasileira"
              imagePath="brasiliam.jpeg"
              color="FF914D"
            />
            <SearchByTypeCard
              categoryName="Bebidas"
              imagePath="drink.jpeg"
              color="FFDE59"
            />
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

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
