import { BurgerProvider } from './burger';

const AppProvider: React.FC = ({ children }: any) => (
  <BurgerProvider>{children}</BurgerProvider>
);

export default AppProvider;
