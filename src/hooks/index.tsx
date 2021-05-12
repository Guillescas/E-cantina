import { BurgerProvider } from './burger';
import { SignInModalContextProvider } from './signinModal';

const AppProvider: React.FC = ({ children }: any) => (
  <SignInModalContextProvider>
    <BurgerProvider>{children}</BurgerProvider>
  </SignInModalContextProvider>
);

export default AppProvider;
