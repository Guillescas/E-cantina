import { ReactElement } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

import { StylesContainer, Button } from './styles';

interface IQuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantitySelector = ({
  quantity,
  setQuantity,
}: IQuantitySelectorProps): ReactElement => {
  const handleRemoveQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddQuantity = () => {
    if (quantity < 50) {
      setQuantity(quantity + 1);
      console.log(quantity);
    }
  };

  return (
    <StylesContainer>
      <Button
        className="minus"
        type="button"
        disabled={quantity === 1}
        onClick={() => handleRemoveQuantity()}
      >
        <FiMinus size={22} />
      </Button>

      <div className="value">{quantity}</div>

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

export default QuantitySelector;
