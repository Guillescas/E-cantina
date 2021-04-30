import { ReactElement, useState } from 'react';
import Link from 'next/link';

import SignModal from '../SignModal';

import { StylesContainer } from './styles';

const TopMenu = (): ReactElement => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <StylesContainer>
      <nav>
        <h1>Logo</h1>

        <div className="links">
          <Link href="/a">
            <a>Some link</a>
          </Link>
          <Link href="/a">
            <a>Another link</a>
          </Link>
          <Link href="/a">
            <a>Third link</a>
          </Link>

          <div className="vertical-bar" />

          <a role="button" onClick={() => toggleModal()}>
            Login
          </a>
          <button type="button">Sign up</button>
        </div>
      </nav>

      <SignModal isModalOpen={modalIsOpen} onRequestClose={toggleModal} />
    </StylesContainer>
  );
};

export default TopMenu;
