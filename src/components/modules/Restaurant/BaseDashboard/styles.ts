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
`;
