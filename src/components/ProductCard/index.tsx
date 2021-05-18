import { ReactElement } from 'react';
import { FiPlus } from 'react-icons/fi';

import { formatPrice } from '../../utils/formatPriceToBR';

import { StylesContainer } from './styles';

const ProductCard = (): ReactElement => {
  return (
    <StylesContainer>
      <img src="/assets/hamburger.jpeg" alt="Imagem de" />
      <h2>Cheese Burger</h2>
      <p>Pão, carne e muito queijo</p>
      <span>{formatPrice(23.9)}</span>

      <button type="button">
        <FiPlus />
        <p>Ver mais</p>
      </button>
    </StylesContainer>
  );
};

export default ProductCard;
