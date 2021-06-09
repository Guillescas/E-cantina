import { shade } from 'polished';
import styled from 'styled-components';

export const StylesContainer = styled.div`
  .back-button {
    display: flex;
    align-items: center;
    justify-content: left;
    max-width: 80px;

    margin-bottom: 1rem;

    cursor: pointer;

    transition: color 0.1s;

    &:hover {
      color: ${shade(0.2, '#f1f1f1')};
    }
  }

  .resume {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    margin-top: 3rem;

    .card-area {
      width: 564px;

      .no-cards {
        text-align: center;
        margin-bottom: 1rem;
      }

      form {
        .card-title {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin: 2rem 0 2rem;

          h1 {
            flex: 1;
          }

          button {
            margin-top: 0;
            margin-left: 0.25rem;
          }
        }
      }

      .card-area-title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 2rem;

        a {
          display: flex;
          align-items: center;

          margin-right: 0.25rem;

          transition: color 0.1s;

          svg {
            margin-right: 0.25rem;
          }

          &:hover {
            color: var(--hover-text);
          }
        }
      }

      .cards {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(3, 144px);
        gap: 1rem;

        @media (max-width: 400px) {
          grid-template-columns: repeat(2, 144px);
        }
      }

      .inline-inputs {
        display: flex;
        align-items: center;

        div {
          margin: 0;
        }
      }

      button {
        margin-top: 1rem;
      }
    }

    table {
      width: 100%;
      text-align: left;
      margin: 1rem 0;

      border-collapse: collapse;
      border-spacing: 1rem 0;

      tr {
        border-bottom: 1px solid var(--text);

        th {
          padding: 1rem 0 0.5rem 0;
          width: 40%;
        }

        td {
          padding: 1rem 0 0.5rem 0;
          flex: 1;
        }
      }
    }

    button {
      margin: 0;
    }
  }
`;
