import { AuthProvider } from './auth';
import { BurgerProvider } from './burger';
import { CartProvider } from './cart';
import { ProductModalContextProvider } from './productModal';
import { SignInModalContextProvider } from './signinModal';

const AppProvider: React.FC = ({ children }: any) => (
  <BurgerProvider>
    <SignInModalContextProvider>
      <AuthProvider>
        <CartProvider>
          <ProductModalContextProvider>{children}</ProductModalContextProvider>
        </CartProvider>
      </AuthProvider>
    </SignInModalContextProvider>
  </BurgerProvider>
);

export default AppProvider;
