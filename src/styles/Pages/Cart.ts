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
  min-height: 1200px;

  margin-left: 1rem;
  padding: 1rem;

  table {
    text-align: left;
    margin-top: 3rem;

    width: 100%;

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
  }

  .checkout-button {
    margin-top: 2rem;
  }
`;
