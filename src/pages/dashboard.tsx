import { ReactElement } from 'react';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import RestaurantCard from '../components/RestaurantCard';
import SearchByTypeCard from '../components/SearchByTypeCard';
import TopDashboardMenu from '../components/TopDashboardMenu';

import {
  StylesContainer,
  Content,
  ContentList,
} from '../styles/Pages/Dashboard';

const Dashboard = (): ReactElement => {
  return (
    <StylesContainer>
      <TopDashboardMenu />

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

          <RestaurantCard />
        </ContentList>
      </Content>
    </StylesContainer>
  );
};

export default Dashboard;
