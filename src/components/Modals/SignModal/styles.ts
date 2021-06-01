import styled from 'styled-components';

export const StylesContainer = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;

    text-align: center;
  }

  .user-options {
    display: flex;
    justify-content: space-between;
  }

  form {
    > div {
      & + div {
        margin-top: 1rem;
      }
    }

    input[type='radio'] {
      height: 1rem;
      padding: 0 0.5rem;
    }
  }

  .login-links {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin: 1rem auto 0;

    a {
      margin: 0 1rem;
    }

    .vertical-bar {
      margin: 0 16px;

      width: 1px;
      height: 22px;
      border-right: 1px solid var(--text);
    }
  }

  label input,
  label select {
    margin-top: 0.75rem;
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

interface IRadioBoxProps {
  isActive: boolean;
  activeColor: 'green' | 'red';
}

export const RadioBox = styled.button<IRadioBoxProps>`
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.1s;

  &:hover {
    border-color: #d7d7d7;
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }
`;

/* background: ${props =>
    props.isActive
      ? transparentize(0.9, colors[props.activeColor])
      : 'transparent'}; */
