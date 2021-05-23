import { ReactElement, useState } from 'react';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import Loading from '../components/Loading';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';

import { withSSRAuth } from '../utils/withSSRAuth';

import { StylesContainer, Content, ContentList } from '../styles/Pages/Cart';

const Cart = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

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
        </ContentList>
      </Content>
    </StylesContainer>
  );
};

export default Cart;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
