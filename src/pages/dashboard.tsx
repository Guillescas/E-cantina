import { ReactElement } from 'react';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import RestaurantCard from '../components/RestaurantCard';
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
          <RestaurantCard />
        </ContentList>
      </Content>
    </StylesContainer>
  );
};

export default Dashboard;
