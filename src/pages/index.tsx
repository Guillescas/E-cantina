import React from 'react';

import TopMenu from '../components/TopMenu';
import SignModal from '../components/SignModal';

import { useSignInModal } from '../hooks/signinModal';

import { StylesContainer, Content } from '../styles/Pages/Index';

const Home: React.FC = () => {
  const { loginModalIsOpen, closeLoginModal } = useSignInModal();

  return (
    <StylesContainer>
      <SignModal
        isModalOpen={loginModalIsOpen}
        onRequestClose={closeLoginModal}
      />

      <Content>
        <TopMenu />
      </Content>
    </StylesContainer>
  );
};

export default Home;
