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
  urlImage: string;
  amount: number;
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
      const productExists = cart.find(
        cartProduct => cartProduct.id === product.id,
      );

      if (!productExists) {
        setCart([...cart, product]);
        Cookies.set('@ECantina:cart', [...cart, product]);

        toast.success('Produto adicionado ao carrinho');
      } else {
        const amount = productExists.amount + 1;

        const updatedCart = cart.map(cartProduct => {
          if (cartProduct.id === product.id) {
            cartProduct.amount = amount;
            return cartProduct;
          }

          return product;
        });

        setCart(updatedCart);
        Cookies.set('@ECantina:cart', [...cart, updatedCart]);

        toast.success('Produto adicionado ao carrinho');
      }
    } catch (error) {
      // #zica
      toast.error('Erro inesperado. Favor contate o suporte');
      console.log(error);
    }
  };

  const removeProduct = async (productId: number) => {
    const productExists = cart.find(product => product.id === productId);

    if (!productExists) {
      return toast.error('Erro na remoção do produto');
    }

    const updatedCart = cart.filter(product => product.id !== productId);

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
        if (cartProduct.id === product.id) {
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
