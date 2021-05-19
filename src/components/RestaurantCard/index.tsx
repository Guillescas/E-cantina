import { ReactElement } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { StylesContainer } from './styles';

interface IRestaurantCardProps {
  name: string;
  description: string;
}

const RestaurantCard = ({
  name,
  description,
}: IRestaurantCardProps): ReactElement => {
  return (
    <StylesContainer>
      <img src="/assets/restaurant.jpeg" alt={`Imagem de ${name}`} />

      <div className="infos">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>

      <div className="icon">
        <FiChevronRight size={22} />
      </div>
    </StylesContainer>
  );
};

export default RestaurantCard;
