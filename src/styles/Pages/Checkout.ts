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

  form {
    .resume {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;

      margin-top: 3rem;

      .card-area {
        h2 {
          margin-bottom: 2rem;
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
  }
`;
