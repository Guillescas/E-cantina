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
`;
