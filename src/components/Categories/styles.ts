import styled from 'styled-components';

export const StylesContainer = styled.div`
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
`;
