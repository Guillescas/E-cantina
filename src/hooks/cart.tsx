import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface CartProviderProps {
  children: ReactNode;
}

interface ICartProduct {
  restaurantId?: number;
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
  product: ICartProduct;
  amount: number;
}

interface CartContextData {
  discountId: number;
  setDiscountId: (discountId: number) => void;
  discount: number;
  setDiscount: (discount: number) => void;
  cart: ICartProduct[];
  addProduct: (product: ICartProduct) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ product, amount }: UpdateProductAmount) => void;
  clearCart: () => void;
  totalCartPrice: (discount?: number) => number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [discount, setDiscount] = useState<number>(0);
  const [discountId, setDiscountId] = useState<number>(0);

  const [cart, setCart] = useState<ICartProduct[]>(() => {
    const storagedCart = Cookies.get('@ECantina:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (product: ICartProduct) => {
    try {
      const cartItemId = cart.length + 1;

      if (cart.length > 1 && cart[0].restaurantId !== product.restaurantId) {
        toast.error('Você só pode adicionar itens de um restaurante por vez');

        return;
      }

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
    }
  };

  const clearCart = () => {
    setCart([]);
    Cookies.remove('@ECantina:cart');
  };

  const totalCartPrice = (): number => {
    const totalProductsPrice = cart.map(product => {
      return product.price * product.amount;
    });

    const sum = totalProductsPrice.reduce((a, b) => a + b, 0);

    return sum - discount;
  };

  return (
    <CartContext.Provider
      value={{
        discountId,
        setDiscountId,
        discount,
        setDiscount,
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
        clearCart,
        totalCartPrice,
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
