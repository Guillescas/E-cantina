import { ReactElement, ReactNode } from 'react';

import LeftDashboardMenu from '../LeftDashboardMenu';
import SEO from '../../../SEO';
import TopDashboardMenu from '../TopDashboardMenu';

import { StylesContainer, Content, ContentList } from './styles';

interface IBaseDashboardProps {
  children: ReactNode;
}

const BaseDashboard = ({ children }: IBaseDashboardProps): ReactElement => {
  return (
    <StylesContainer>
      <SEO title="Dashboard" />

      <TopDashboardMenu />

      <Content>
        <LeftDashboardMenu />

        <ContentList>{children}</ContentList>
      </Content>
    </StylesContainer>
  );
};

export default BaseDashboard;
