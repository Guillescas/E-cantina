/* eslint-disable react/destructuring-assignment */
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface ProductModalContextData {
  productModalIsOpen: boolean;
  setModalProductIsOpen: (props: boolean) => void;
  openProductModal: () => void;
  closeProductModal: () => void;
}

interface IProductModalContextProviderProps {
  children: ReactNode;
}

const ProductModalContext = createContext<ProductModalContextData>(
  {} as ProductModalContextData,
);

export const ProductModalContextProvider = ({
  children,
}: IProductModalContextProviderProps): ReactElement => {
  const [productModalIsOpen, setModalProductIsOpen] = useState(false);
  const openProductModal = () => {
    setModalProductIsOpen(true);
  };

  const closeProductModal = () => {
    setModalProductIsOpen(false);
  };

  return (
    <ProductModalContext.Provider
      value={{
        productModalIsOpen,
        setModalProductIsOpen,
        openProductModal,
        closeProductModal,
      }}
    >
      {children}
    </ProductModalContext.Provider>
  );
};

export function useProductModal(): ProductModalContextData {
  const context = useContext(ProductModalContext);

  if (!context) {
    throw new Error(
      'useProductModalContext must be used within a AuthProvider',
    );
  }

  return context;
}

export default ProductModalContext;
