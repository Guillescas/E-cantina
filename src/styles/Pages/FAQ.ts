import styled, { css } from 'styled-components';

export const StylesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 50px;
    width: 100%;
  }
  .container {
    width: 100%;
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .accordion-item {
    background-color: #283042;
    border-radius: 0.4rem;
    margin-bottom: 1rem;
    padding: 1rem;
    box-shadow: 0.5rem 2px 0.5rem rgba(0, 0, 0, 0.1);
  }

  .accordion-link {
    font-size: 1.6rem;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    background-color: #283042;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 1rem;
  }

  .accordion-link i {
    color: #e7d5ff;
    padding: 0.5rem;
  }

  .accordion-link .ion-md-remove {
    display: none;
  }

  .FAQ_titulo {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    width: 50%;
    margin: 0 auto;
    padding: 1rem;
  }
`;

interface IStylesAwnserProps {
  isBoxFAQOpen: boolean;
}

export const StylesAwnser = styled.div<IStylesAwnserProps>`
  max-height: 0;
  ${props =>
    props.isBoxFAQOpen
      ? css`
          display: inicial;
        `
      : css`
          display: none;
        `}
  position: relative;
  background-color: #212838;
  margin-top: 5.5rem;
  transition: max-height 650px;

  &:before {
    content: '';
    width: 0.6rem;
    height: 90%;
    top: 100%;
    left: 0;
  }
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.2rem;
    position: relative;
    bottom: 4.8rem;
  }
`;

export const StylesAwnser2 = styled.div<IStylesAwnserProps>`
  max-height: 0;
  ${props =>
    props.isBoxFAQOpen2
      ? css`
          display: inicial;
        `
      : css`
          display: none;
        `}
  position: relative;
  background-color: #212838;
  margin-top: 7rem;
  transition: max-height 650px;

  &:before {
    content: '';
    width: 0.6rem;
    height: 90%;
    top: 100%;
    left: 0;
  }
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.2rem;
    position: relative;
    bottom: 6.2rem;
  }
`;

export const StylesAwnser3 = styled.div<IStylesAwnserProps>`
  max-height: 0;
  ${props =>
    props.isBoxFAQOpen3
      ? css`
          display: inicial;
        `
      : css`
          display: none;
        `}
  position: relative;
  background-color: #212838;
  margin-top: 4rem;
  transition: max-height 650px;

  &:before {
    content: '';
    width: 0.6rem;
    height: 90%;
    top: 100%;
    left: 0;
  }
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.2rem;
    position: relative;
    bottom: 3.2rem;
  }
`;

export const StylesAwnser4 = styled.div<IStylesAwnserProps>`
  max-height: 0;
  ${props =>
    props.isBoxFAQOpen4
      ? css`
          display: inicial;
        `
      : css`
          display: none;
        `}
  position: relative;
  background-color: #212838;
  margin-top: 2.2rem;
  transition: max-height 650px;

  &:before {
    content: '';
    width: 0.6rem;
    height: 90%;
    top: 100%;
    left: 0;
  }
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.2rem;
    position: relative;
    bottom: 1.8rem;
  }
`;

export const StylesAwnser5 = styled.div<IStylesAwnserProps>`
  max-height: 0;
  ${props =>
    props.isBoxFAQOpen5
      ? css`
          display: inicial;
        `
      : css`
          display: none;
        `}
  position: relative;
  background-color: #212838;
  margin-top: 5.5rem;
  transition: max-height 650px;

  &:before {
    content: '';
    width: 0.6rem;
    height: 90%;
    top: 100%;
    left: 0;
  }
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.2rem;
    position: relative;
    bottom: 4.8rem;
  }
`;

export const StylesAwnser6 = styled.div<IStylesAwnserProps>`
  max-height: 0;
  ${props =>
    props.isBoxFAQOpen6
      ? css`
          display: inicial;
        `
      : css`
          display: none;
        `}
  position: relative;
  background-color: #212838;
  margin-top: 2.2rem;
  transition: max-height 650px;

  &:before {
    content: '';
    width: 0.6rem;
    height: 90%;
    top: 100%;
    left: 0;
  }
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.2rem;
    position: relative;
    bottom: 1.8rem;
  }
`;
