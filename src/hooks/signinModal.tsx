/* eslint-disable react/destructuring-assignment */
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface SignInModalContextData {
  loginModalIsOpen: boolean;
  setModalLoginIsOpen: (props: boolean) => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

interface ISignInModalContextProviderProps {
  children: ReactNode;
}

const SignInModalContext = createContext<SignInModalContextData>(
  {} as SignInModalContextData,
);

export const SignInModalContextProvider = ({
  children,
}: ISignInModalContextProviderProps): ReactElement => {
  const [loginModalIsOpen, setModalLoginIsOpen] = useState(false);
  const openLoginModal = () => {
    setModalLoginIsOpen(true);
  };

  const closeLoginModal = () => {
    setModalLoginIsOpen(false);
  };

  return (
    <SignInModalContext.Provider
      value={{
        loginModalIsOpen,
        setModalLoginIsOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </SignInModalContext.Provider>
  );
};

export function useSignInModal(): SignInModalContextData {
  const context = useContext(SignInModalContext);

  if (!context) {
    throw new Error('useSignInModalContext must be used within a AuthProvider');
  }

  return context;
}

export default SignInModalContext;
