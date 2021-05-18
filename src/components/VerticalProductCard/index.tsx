import { ReactElement } from 'react';
import { FiPlus } from 'react-icons/fi';
import { formatPrice } from '../../utils/formatPriceToBR';

import { StylesContainer } from './styles';

const VerticalProductCard = (): ReactElement => {
  return (
    <StylesContainer>
      <img src="/assets/hamburger.jpeg" alt="Imagem de" />

      <div className="infos">
        <h2>Cheese burger</h2>
        <p>Pão, carne e muito queijo</p>
        <span>{formatPrice(23.9)}</span>
      </div>

      <div className="icon">
        <FiPlus size={22} />
        Ver mais
      </div>
    </StylesContainer>
  );
};

export default VerticalProductCard;
