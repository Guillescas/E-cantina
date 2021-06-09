import { AuthProvider } from './auth';
import { BurgerProvider } from './burger';
import { CartProvider } from './cart';
import { ProductModalContextProvider } from './productModal';
import { SignInModalContextProvider } from './signinModal';
import { SearchRestaurantByProvider } from './searchRestaurantBy';

const AppProvider: React.FC = ({ children }: any) => (
  <BurgerProvider>
    <SignInModalContextProvider>
      <AuthProvider>
        <SearchRestaurantByProvider>
          <CartProvider>
            <ProductModalContextProvider>
              {children}
            </ProductModalContextProvider>
          </CartProvider>
        </SearchRestaurantByProvider>
      </AuthProvider>
    </SignInModalContextProvider>
  </BurgerProvider>
);

export default AppProvider;
