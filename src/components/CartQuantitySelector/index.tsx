import { ReactElement } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../hooks/cart';

import { StylesContainer, Button } from './styles';

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

interface ICartQuantitySelectorProps {
  product: IProduct;
}

const CartQuantitySelector = ({
  product,
}: ICartQuantitySelectorProps): ReactElement => {
  const { cart, updateProductAmount } = useCart();

  const cartProduct = cart.filter(
    item => item.cartItemId === product.cartItemId,
  );

  const handleRemoveQuantity = () => {
    if (product.amount > 1) {
      const updatedProductAmount = product.amount - 1;

      updateProductAmount({ product, amount: updatedProductAmount });
    }
  };

  const handleAddQuantity = () => {
    if (product.amount < 50) {
      const updatedProductAmount = product.amount + 1;

      updateProductAmount({ product, amount: updatedProductAmount });
    }
  };

  return (
    <StylesContainer>
      <Button
        className="minus"
        type="button"
        disabled={cartProduct[0].amount === 1}
        onClick={() => handleRemoveQuantity()}
      >
        <FiMinus size={22} />
      </Button>

      <div className="value">{cartProduct[0].amount}</div>

      <Button
        className="plus"
        type="button"
        onClick={() => handleAddQuantity()}
      >
        <FiPlus size={22} />
      </Button>
    </StylesContainer>
  );
};

export default CartQuantitySelector;
