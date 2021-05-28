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

export const ContentList = styled.div`
  background: var(--second-background);
  border-radius: 0.75rem;

  width: 100%;
  max-width: 1000px;
  min-height: 1200px;

  margin-left: 1rem;
  padding: 1rem;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 4rem;

    h1 {
      flex: 1;
    }
  }

  form {
    .inputs {
      display: grid;
      align-items: end;
      grid-template-columns: repeat(2, 1fr);
    }

    button {
      margin-top: 1rem;
      width: 100%;
    }
  }
`;
