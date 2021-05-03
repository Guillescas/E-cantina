import { ReactElement, useRef, useState } from 'react';
import Link from 'next/link';

import SignModal from '../SignModal';
import Burger from '../Burger';
import MenuOfBurger from '../MenuOfBurger';

import { StylesContainer } from './styles';

const TopMenu = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const node = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <StylesContainer>
      <nav>
        <h1>Logo</h1>

        <div ref={node} className="links-on-burger">
          <Burger open={open} setOpen={setOpen} />
          <MenuOfBurger open={open} />
        </div>

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
