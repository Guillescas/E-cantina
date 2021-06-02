import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface CartProviderProps {
  children: ReactNode;
}

interface IProduct {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
  urlImage?: string;
  amount: number;
  observation?: string;
  cartItemId: number;
}

interface UpdateProductAmount {
  product: IProduct;
  amount: number;
}

interface ICheckoutProps {
  userId: number;
  name?: string;
}

interface CartContextData {
  cart: IProduct[];
  addProduct: (product: IProduct) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ product, amount }: UpdateProductAmount) => void;
  checkout: (data: ICheckoutProps) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<IProduct[]>(() => {
    const storagedCart = Cookies.get('@ECantina:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (product: IProduct) => {
    try {
      const cartItemId = cart.length + 1;

      const updatedProduct = {
        ...product,
        cartItemId,
      };
      setCart([...cart, updatedProduct]);
      Cookies.set('@ECantina:cart', [...cart, updatedProduct]);

      toast.success('Produto adicionado ao carrinho');
    } catch (error) {
      toast.error('Erro inesperado. Favor contate o suporte');
    }
  };

  const removeProduct = async (cartProductItemId: number) => {
    const productExists = cart.find(
      product => product.cartItemId === cartProductItemId,
    );

    if (!productExists) {
      return toast.error('Erro na remoção do produto');
    }

    const updatedCart = cart.filter(
      product => product.cartItemId !== cartProductItemId,
    );

    setCart(updatedCart);
    Cookies.set('@ECantina:cart', updatedCart);
  };

  const updateProductAmount = async ({
    product,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount < 1) {
        return;
      }

      const updatedCart = cart.map(cartProduct => {
        if (cartProduct.cartItemId === product.cartItemId) {
          cartProduct.amount = amount;

          return cartProduct;
        }

        return cartProduct;
      });

      setCart(updatedCart);
      Cookies.set('@ECantina:cart', updatedCart);
    } catch (error) {
      toast.error('Erro na alteração de quantidade do produto');
      console.log(error);
    }
  };

  const checkout = ({ userId }: ICheckoutProps) => {
    const sumOfProductsPrice = cart.map(product => {
      const increment = product.price * product.amount;
      return increment;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
