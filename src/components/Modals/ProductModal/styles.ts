import styled from 'styled-components';

export const StylesContainer = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;

    text-align: center;
  }

  .resume {
    margin: 2rem 0 0.75rem;
    font-size: 1.15rem;

    span {
      font-weight: 700;
      min-width: 2rem;
    }
  }

  .user-options {
    display: flex;
    justify-content: space-between;
  }

  form {
    > div {
      margin-bottom: 1rem;
    }

    input[type='radio'] {
      height: 1rem;
      padding: 0 0.5rem;
    }
  }

  label input,
  label select {
    margin-top: 0.75rem;
  }
`;
