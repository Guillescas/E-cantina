import { ReactElement, ReactNode, useState } from 'react';

import LeftDashboardMenu from '../LeftDashboardMenu';
import SEO from '../SEO';
import TopDashboardMenu from '../TopDashboardMenu';

import { StylesContainer, Content, ContentList } from './styles';

interface IBaseDashboardProps {
  children: ReactNode;
}

const BaseDashboard = ({ children }: IBaseDashboardProps): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <StylesContainer>
      <SEO title="Dashboard" />

      <TopDashboardMenu setIsLoading={setIsLoading} />

      <Content>
        <LeftDashboardMenu />

        <ContentList>{children}</ContentList>
      </Content>
    </StylesContainer>
  );
};

export default BaseDashboard;
