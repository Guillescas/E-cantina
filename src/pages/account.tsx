import { ReactElement, useState } from 'react';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import Loading from '../components/Loading';
import RestaurantCard from '../components/RestaurantCard';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';

import { StylesContainer, Content, ContentList } from '../styles/Pages/Account';

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

const Account = (): ReactElement => {
  const [restaurants, setRestaurants] = useState<IRestaurantProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <StylesContainer>
      <SEO title="Minha conta" />
      <TopDashboardMenu
        setIsLoading={setIsLoading}
        setRestaurants={setRestaurants}
      />

      <Content>
        <LeftDashboardMenu />

        <ContentList>
          <h1>Informações sobre a minha conta</h1>
        </ContentList>
      </Content>
    </StylesContainer>
  );
};

export default Account;
