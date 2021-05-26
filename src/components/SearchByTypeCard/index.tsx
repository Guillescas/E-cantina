import { ReactElement } from 'react';

import { StylesContainer } from './styles';

interface ISearchByTypeCardProps {
  imagePath: string;
  categoryName: string;
  color: string;
}

const SearchByTypeCard = ({
  imagePath,
  categoryName,
  color,
}: ISearchByTypeCardProps): ReactElement => {
  return (
    <StylesContainer color={color}>
      <img
        src={`/assets/${imagePath}`}
        alt={`Imagem da categoria de ${categoryName}`}
      />

      <p>{categoryName}</p>
    </StylesContainer>
  );
};

export default SearchByTypeCard;
