import { ReactElement } from 'react';

import SearchByTypeCard from '../SearchByTypeCard';

import { StylesContainer } from './styles';

interface ICategoriesProps {
  setCategory: (categoryName: string) => void;
  setSearchByRestaurantName: (restaurantName: string) => void;
}

const Categories = ({
  setCategory,
  setSearchByRestaurantName,
}: ICategoriesProps): ReactElement => {
  return (
    <StylesContainer>
      <SearchByTypeCard
        categoryLabel="Lanches"
        categoryName="lanches"
        imagePath="hamburger.jpeg"
        color="db5a40"
        setCategory={setCategory}
        setSearchByRestaurantName={setSearchByRestaurantName}
      />
      <SearchByTypeCard
        categoryLabel="Japonês"
        categoryName="japones"
        imagePath="japa.jpeg"
        color="8C52FF"
        setCategory={setCategory}
        setSearchByRestaurantName={setSearchByRestaurantName}
      />
      <SearchByTypeCard
        categoryLabel="Vegetariana"
        categoryName="vegetariana"
        imagePath="vegan.jpeg"
        color="7ED957"
        setCategory={setCategory}
        setSearchByRestaurantName={setSearchByRestaurantName}
      />
      <SearchByTypeCard
        categoryLabel="Brasileira"
        categoryName="brasileira"
        imagePath="brasiliam.jpeg"
        color="FF914D"
        setCategory={setCategory}
        setSearchByRestaurantName={setSearchByRestaurantName}
      />
      <SearchByTypeCard
        categoryLabel="Bebidas"
        categoryName="bebidas"
        imagePath="drink.jpeg"
        color="FFDE59"
        setCategory={setCategory}
        setSearchByRestaurantName={setSearchByRestaurantName}
      />
    </StylesContainer>
  );
};

export default Categories;
