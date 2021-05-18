import { ReactElement } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { StylesContainer } from './styles';

const RestaurantCard = (): ReactElement => {
  return (
    <StylesContainer>
      <img src="/assets/restaurant.jpeg" alt="Imagem de restaurante" />

      <div className="infos">
        <h2>Restaurante do seu zé</h2>
        <p>
          Um restaurante com comidas divesificadas e um bom lugar para conversas
          e reuniões.
        </p>
      </div>

      <div className="icon">
        <FiChevronRight size={22} />
      </div>
    </StylesContainer>
  );
};

export default RestaurantCard;
