import { shade } from 'polished';
import styled from 'styled-components';

export const StylesContainer = styled.div`
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
`;
