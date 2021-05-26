import Link from 'next/link';
import { ReactElement } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { StylesContainer } from './styles';

interface IRestaurantCardProps {
  id: number;
  name: string;
  description: string;
}

const RestaurantCard = ({
  id,
  name,
  description,
}: IRestaurantCardProps): ReactElement => {
  return (
    <Link href={`/restaurant/${id}`}>
      <StylesContainer>
        <img src="/assets/restaurant.jpeg" alt={`Imagem de ${name}`} />

        <div className="infos">
          <h2>{name}</h2>
          <p>
            oaisdgoagdO ADGYAOSDY AOSDYGAODYUGAOSUYoygasodyugasod yasgdo
            yasgoasdyoyug
          </p>
        </div>

        <div className="icon">
          <FiChevronRight size={22} />
        </div>
      </StylesContainer>
    </Link>
  );
};

export default RestaurantCard;
