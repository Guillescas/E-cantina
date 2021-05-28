import React, { useEffect } from 'react';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

import TopMenu from '../components/TopMenu';
import SignModal from '../components/SignModal';

import { useSignInModal } from '../hooks/signinModal';

import { StylesContainer, Content } from '../styles/Pages/Index';

const Home: React.FC = () => {
  const { loginModalIsOpen, closeLoginModal } = useSignInModal();

  const cookies = parseCookies(undefined);

  useEffect(() => {
    toast.info(cookies['@ECantinaReturnMessage']);
  }, [cookies]);

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
