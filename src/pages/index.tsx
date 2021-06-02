import React, { useEffect } from 'react';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

import TopMenu from '../components/TopMenu';
import SignModal from '../components/Modals/SignModal';

import { useSignInModal } from '../hooks/signinModal';

import { StylesContainer, Content } from '../styles/Pages/Index';

const Home: React.FC = () => {
  const { loginModalIsOpen, closeLoginModal } = useSignInModal();

  const cookies = parseCookies(undefined);

  useEffect(() => {
    if (cookies['@ECantinaReturnMessage']) {
      toast.info(cookies['@ECantinaReturnMessage'], {
        toastId: 1,
      });
    }
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
