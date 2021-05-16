import styled from 'styled-components';

export const StylesContainer = styled.header`
  background: var(--second-background);
  border-radius: 0 0 8px 8px;

  button {
    margin: 0 4px 0 16px;

    padding: 8px 16px;

    background: none;
    border: 1px solid #fff;
    border-radius: 6px;

    color: var(--text);
    font-weight: 600;
    font-size: 0.9rem;

    transition: all 0.2s;
  }
`;

export const InlineMenu = styled.header`
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-card {
      position: relative;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 13fr 1fr;

      width: 100%;
      max-width: 280px;

      padding-right: 8px;

      background: var(--background);
      border-radius: 50px 24px 24px 50px;

      .user-avatar {
        background: var(--background);
        border-radius: 50%;

        width: 50px;
        height: 50px;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      .user-infos {
        p {
          font-size: 0.75rem;
        }
      }
    }

    form {
      width: 100%;

      margin: 0 1rem;

      > div {
        height: 50px;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserCardDropdown = styled.div`
  background: var(--background);
  width: 100%;
  max-width: 280px;

  padding-right: 8px;

  position: absolute;
  top: 60px;

  div {
    border-top: 1px solid var(--text);
    border-bottom: 1px solid var(--text);
    border-radius: 0;
  }

  #simple-menu {
    background: var(--background);
  }
`;

export const BurgerStyles = styled.div`
  display: none;

  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    right: 36px;
    top: 36px;
  }
  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #fff;
    border-radius: 4px;

    transition: background 0.1s;
  }
  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: var(--primary);
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  /* Color/shape of close button cross */
  .bm-cross {
    background: #fff;
    width: 32px;
    height: 32px;
  }

  /*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
  .bm-menu-wrap {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
  }

  /* General sidebar styles */
  .bm-menu {
    background: #000;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
    font-weight: 500;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
    margin: 0.75rem 0;
    font-size: 1.5rem;
    font-weight: 500;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;
