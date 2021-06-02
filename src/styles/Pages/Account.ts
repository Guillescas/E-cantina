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

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 2rem;

    h1 {
      flex: 1;
    }
  }

  form {
    .inputs {
      display: grid;
      align-items: end;
      grid-template-columns: repeat(2, 1fr);
    }

    .finish-update-container {
      margin-top: 2rem;

      span {
        display: flex;
        align-items: left;
        justify-content: left;

        margin-bottom: 0.5rem;
        padding-left: 4px;

        svg {
          margin-right: 0.5rem;
        }
      }

      .finish-update-user-infos {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-content: center;
        gap: 0.25rem;

        button {
          margin: 0;
          height: 59px;
        }
      }
    }
  }

  .upload-image-p {
    margin-top: 4rem;
    margin-bottom: 1rem;
  }

  .file-upload-form {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-image {
      background: var(--background);
      width: 200px;
      height: 200px;

      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 200px;
        max-width: 100%;
        height: 200px;
        max-height: 100%;

        border-radius: 50%;
      }
    }
  }
`;
