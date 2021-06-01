import styled from 'styled-components';

export const StylesContainer = styled.div`
  display: flex;
  justify-content: space-between;

  background: var(--background);
  border-radius: 0.75rem;

  margin-bottom: 1rem;

  cursor: pointer;

  &:hover {
    .icon {
      transform: translateX(0.5rem);
    }
  }

  #vertocal-product-card-image {
    max-width: 12rem;
    width: 100%;
    max-height: 12rem;
    height: 100%;

    object-fit: cover;

    border-radius: 0.75rem 0 0 0.75rem;
    margin-right: 1rem;
  }

  .infos {
    flex: 1;

    h2 {
      margin: 0.5rem 0;
    }

    span {
      color: var(--primary);
      font-weight: bold;
      font-size: 1.5rem;

      min-height: 1rem;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 1rem;

    transition: transform 0.2s;
  }
`;
