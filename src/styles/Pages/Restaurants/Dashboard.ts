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
  min-height: 500px;

  margin-left: 1rem;
  padding: 1rem 1rem 1.5rem;

  .statistcs {
    display: flex;
    align-items: center;
    justify-content: space-between;

    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      padding: 1rem;

      background: var(--background);
      border-radius: 0.75rem;

      p {
        font-weight: 700;
        margin-bottom: 0.5rem;

        .rating {
          display: flex;
          align-items: center;
          justify-content: center;

          span {
            margin-top: 4px;
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
`;
