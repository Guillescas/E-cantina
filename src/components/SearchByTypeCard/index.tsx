import { ReactElement } from 'react';

import { StylesContainer } from './styles';

interface ISearchByTypeCardProps {
  imagePath: string;
  categoryLabel: string;
  categoryName: string;
  color: string;
  setCategory: (categoryName: string) => void;
  setSearchByRestaurantName: (restaurantName: string) => void;
}

const SearchByTypeCard = ({
  imagePath,
  categoryLabel,
  categoryName,
  color,
  setCategory,
  setSearchByRestaurantName,
}: ISearchByTypeCardProps): ReactElement => {
  return (
    <StylesContainer
      color={color}
      onClick={() => {
        setSearchByRestaurantName('');
        setCategory(categoryName);
      }}
    >
      <img
        src={`/assets/${imagePath}`}
        alt={`Imagem da categoria de ${categoryLabel}`}
      />

      <p>{categoryLabel}</p>
    </StylesContainer>
  );
};

export default SearchByTypeCard;
