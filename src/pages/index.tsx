import { ReactElement } from 'react';

import SEO from '../components/SEO';
import TopMenu from '../components/TopMenu';

import { Container } from '../styles/Pages/Index';

export default function Home(): ReactElement {
  return (
    <Container>
      <SEO title="Home" />

      <TopMenu />
    </Container>
  );
}
