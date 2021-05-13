import { ReactElement } from 'react';
import TopDashboardMenu from '../components/TopDashboardMenu';

import { StylesContainer } from '../styles/Pages/Dashboard';

const Dashboard = (): ReactElement => {
  return (
    <StylesContainer>
      <TopDashboardMenu />
    </StylesContainer>
  );
};

export default Dashboard;
