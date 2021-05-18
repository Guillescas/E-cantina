import { ReactElement } from 'react';

import { StylesContainer } from './styles';

interface ISearchByTypeCardProps {
  imagePath: string;
  categoryName: string;
}

const SearchByTypeCard = ({
  imagePath,
  categoryName,
}: ISearchByTypeCardProps): ReactElement => {
  return (
    <StylesContainer>
      <img
        src={`/assets/${imagePath}`}
        alt={`Imagem da categoria de ${categoryName}`}
      />

      <p>{categoryName}</p>
    </StylesContainer>
  );
};

export default SearchByTypeCard;
