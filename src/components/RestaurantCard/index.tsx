import Link from 'next/link';
import { ReactElement } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { StylesContainer } from './styles';

interface IRestaurantCardProps {
  id: number;
  name: string;
  description: string;
  restaurantUrlImage: string;
}

const RestaurantCard = ({
  id,
  name,
  description,
  restaurantUrlImage,
}: IRestaurantCardProps): ReactElement => {
  return (
    <Link href={`/restaurant/${id}`}>
      <StylesContainer>
        {restaurantUrlImage ? (
          <img
            src={`http://localhost:8080${restaurantUrlImage}`}
            alt={`Imagem de ${name}`}
          />
        ) : (
          <img src="/assets/restaurant.jpeg" alt="Imagem de um restaurante" />
        )}

        <div className="infos">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>

        <div className="icon">
          <FiChevronRight size={22} />
        </div>
      </StylesContainer>
    </Link>
  );
};

export default RestaurantCard;
