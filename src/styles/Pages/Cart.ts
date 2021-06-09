import styled from 'styled-components';

export const StylesContainer = styled.div``;

export const Content = styled.div`
  max-width: 1300px;

  margin: 2rem auto;

  display: flex;
  align-items: top;
  justify-content: space-between;

  position: relative;
`;

export const CartContent = styled.div`
  background: var(--second-background);
  border-radius: 0.75rem;

  width: 100%;
  max-width: 1000px;
  min-height: 500px;

  margin-left: 1rem;
  padding: 1rem 1rem 1.5rem;

  .table-container {
    overflow-x: auto;

    ::-webkit-scrollbar {
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: var(--background);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--hover-text);
    }

    table {
      text-align: left;
      margin-top: 3rem;

      width: 100%;
      min-width: 950px;
      border-collapse: collapse;

      .image {
        width: 1.5rem;
      }

      th {
        padding: 0.25rem 0 1rem;
      }

      th,
      td {
        padding: 0 1rem;
      }

      img {
        max-width: 6rem;
        border-radius: 0.5rem;
      }

      button {
        margin: 0;
      }
    }
  }

  .resume {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    margin-top: 3rem;

    .coupon-area {
      display: flex;
      flex-direction: column;

      height: 241px;

      h2 {
        margin-bottom: 2rem;
      }

      .discount-info {
        margin: 0.5rem 0;
        display: flex;
        align-items: center;

        p {
          margin-left: 0.5rem;
        }
      }

      button {
        margin-top: 0.75rem;
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

  .checkout-button {
    margin-top: 2rem;
  }
`;
