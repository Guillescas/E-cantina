import { ReactElement, useState } from 'react';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import Loading from '../components/Loading';
import RestaurantCard from '../components/RestaurantCard';
import SearchByTypeCard from '../components/SearchByTypeCard';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';

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
  category: string;
}

const Dashboard = (): ReactElement => {
  const [restaurants, setRestaurants] = useState<IRestaurantProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <StylesContainer>
      <SEO title="Dashboard" />
      <TopDashboardMenu
        setIsLoading={setIsLoading}
        setRestaurants={setRestaurants}
      />

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

          {isLoading && <Loading />}
          {restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              name={restaurant.name}
              description={restaurant.description}
            />
          ))}
          {restaurants === [] && <h2>Não foi encontrado nenhum restaurante</h2>}
        </ContentList>
      </Content>
    </StylesContainer>
  );
};

export default Dashboard;
