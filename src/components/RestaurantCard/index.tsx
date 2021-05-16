import { ReactElement } from 'react';

import { StylesContainer } from './styles';

const RestaurantCard = (): ReactElement => {
  return (
    <StylesContainer>
      <img src="/assets/restaurant.jpeg" alt="Imagem de restaurante" />

      <div>
        <h2>Restaurante do seu zé</h2>
        <p>
          Um restaurante com comidas divesificadas e um bom lugar para conversas
          e reuniões.
        </p>
      </div>
    </StylesContainer>
  );
};

export default RestaurantCard;
