import { BurgerProvider } from './burger';
import { SignInModalContextProvider } from './signinModal';

const AppProvider: React.FC = ({ children }: any) => (
  <BurgerProvider>
    <SignInModalContextProvider>{children}</SignInModalContextProvider>
  </BurgerProvider>
);

export default AppProvider;
