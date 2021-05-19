import { AuthProvider } from './auth';
import { BurgerProvider } from './burger';
import { SignInModalContextProvider } from './signinModal';

const AppProvider: React.FC = ({ children }: any) => (
  <BurgerProvider>
    <SignInModalContextProvider>
      <AuthProvider>{children}</AuthProvider>
    </SignInModalContextProvider>
  </BurgerProvider>
);

export default AppProvider;
