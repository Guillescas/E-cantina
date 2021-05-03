import styled from 'styled-components';

export const StylesContainer = styled.header`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .links-on-burger {
      display: none;
    }

    .links {
      display: flex;
      align-items: center;

      font-size: 1rem;

      a {
        margin: 0 8px;
        font-weight: 500;
      }

      .vertical-bar {
        margin: 0 16px;

        width: 1px;
        height: 22px;
        border-right: 1px solid var(--text);
      }

      button {
        margin: 0 4px 0 16px;

        padding: 8px 12px;

        background: none;
        border: 1px solid #bee3db;
        border-radius: 4px;

        color: var(--text);
        font-weight: 500;
        font-size: 0.95rem;

        transition: all 0.2s;

        &:hover {
          background: #bee3db;
          color: var(--background);
          border: 1px solid #bee3db;
        }
      }
    }

    @media (max-width: 768px) {
      .links-on-burger {
        display: initial;
      }

      .links {
        display: none;
      }
    }
  }
`;
