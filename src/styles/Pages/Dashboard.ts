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

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin: 2rem 0;
  }

  .no-restaurants {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin: 2rem 0;
  }

  .search-result-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 1rem 0;

    p {
      font-size: 1.5rem;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 150px;

      padding: 0.5rem 0.75rem;

      background: var(--primary);
      border: none;
      border-radius: 0.25rem;

      transition: width 0.2s;

      .icon {
        color: transparent;
        transition: all 0.2s;
        width: 0px;
        height: 0px;
      }

      span {
        margin-right: 0.25rem;
        padding-bottom: 1px;
        transition: all 0.2s;
      }

      &:hover {
        width: 166px;

        .icon {
          width: 16px;
          height: 16px;

          color: var(--background);
        }
      }
    }
  }
`;
