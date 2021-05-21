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

  .categories {
    margin-bottom: 2rem;
    overflow-x: auto;

    display: flex;
    gap: 0 1rem;
    padding-bottom: 0.5rem;

    ::-webkit-scrollbar {
      height: 3px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
    }
  }

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
    }

    &:hover {
      button {
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
