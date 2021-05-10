/* eslint-disable react/destructuring-assignment */
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface BurgerContextData {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  stateChangeHandler: any;
}

interface IBurgerProviderProps {
  children: ReactNode;
}

const BurgerContext = createContext<BurgerContextData>({} as BurgerContextData);

export const BurgerProvider = ({
  children,
}: IBurgerProviderProps): ReactElement => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  return (
    <BurgerContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: (newState: any) =>
          setMenuOpenState(newState.isOpen),
      }}
    >
      {children}
    </BurgerContext.Provider>
  );
};

export function useBurger(): BurgerContextData {
  const context = useContext(BurgerContext);

  if (!context) {
    throw new Error('useBurger must be used within a AuthProvider');
  }

  return context;
}

export default BurgerContext;
