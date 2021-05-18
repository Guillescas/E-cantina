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

export const RestaurantContent = styled.div`
  background: var(--second-background);
  border-radius: 0.75rem;

  width: 100%;
  max-width: 1000px;
  min-height: 1200px;

  margin-left: 1rem;

  background: #009fff;
  background: -webkit-linear-gradient(
    to bottom,
    #383838,
    var(--second-background)
  );
  background: linear-gradient(to bottom, #383838, var(--second-background));

  img {
    border-radius: 0.75rem 0.75rem 0 0;

    max-width: 100%;
    width: 100%;
    max-height: 300px;

    object-fit: cover;
  }

  .main {
    padding: 1rem;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

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

    .description {
      width: 100%;
      margin: 1.5rem auto;
      font-size: 1.25rem;

      p {
        text-align: center;
        margin: 0 auto;
        max-width: 650px;
      }
    }

    .section {
      margin: 4rem 0 0;
    }

    .section.hot-sale {
      .cards {
        margin: 1rem 0;
        overflow-x: auto;

        display: flex;
        gap: 0 1rem;
        padding-bottom: 0.5rem;

        ::-webkit-scrollbar {
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background: #888;
        }
      }
    }
  }
`;
