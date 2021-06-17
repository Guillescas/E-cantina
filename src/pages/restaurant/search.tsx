import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

import LeftDashboardMenu from '../../components/LeftDashboardMenu';
import Loading from '../../components/Loading';
import RestaurantCard from '../../components/RestaurantCard';
import SEO from '../../components/SEO';
import TopDashboardMenu from '../../components/TopDashboardMenu';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import Categories from '../../components/Categories';

import { api } from '../../services/apiClient';

import { withSSRAuth } from '../../utils/withSSRAuth';

import {
  StylesContainer,
  Content,
  ContentList,
} from '../../styles/Pages/Search';

interface IRestaurantProps {
  url: string;
  id: number;
  email: string;
  name: string;
  description?: string;
  category: {
    id: number;
    name: string;
  };
}

const Search = (): ReactElement => {
  const router = useRouter();

  const restaurantName = router.query;

  const [restaurants, setRestaurants] = useState<IRestaurantProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [searchByRestaurantName, setSearchByRestaurantName] = useState('');
  const [isToClearFormData, setIsToClearFormData] = useState(false);

  useEffect(() => {
    api
      .get(`/restaurant?nameRestaurant=${restaurantName.keyword}`)
      .then(response => {
        setRestaurants(response.data.content);
      })
      .catch(() => {
        return toast.error('Houve um erro inesperado. Tente mais tarde');
      });
  }, [restaurantName]);

  useEffect(() => {
    api
      .get(`/restaurant?nameCategory=${category}`)
      .then(response => {
        setRestaurants(response.data.content);
      })
      .catch(() => {
        return toast.error('Houve um erro inesperado. Tente mais tarde');
      });
  }, [category]);

  return (
    <StylesContainer>
      <SEO title="Busca" />

      <TopDashboardMenu
        setIsLoading={setIsLoading}
        setSearchByRestaurantName={setSearchByRestaurantName}
        isToClearFormData={isToClearFormData}
        setCategory={setCategory}
      />

      <Content>
        <LeftDashboardMenu />

        <ContentList>
          <Categories
            setCategory={setCategory}
            setSearchByRestaurantName={setSearchByRestaurantName}
          />

          {searchByRestaurantName !== '' && (
            <div className="search-result-bar">
              <p>
                Resultados de busca para:{' '}
                <strong>{searchByRestaurantName}</strong>{' '}
              </p>

              <ButtonWithIcon
                icon={FiX}
                onClick={() => {
                  setIsToClearFormData(!isToClearFormData);
                  setCategory('');
                }}
              >
                Cancelar pesquisa
              </ButtonWithIcon>
            </div>
          )}

          {category !== '' && (
            <div className="search-result-bar">
              <p>
                Resultados de busca para a categoria:{' '}
                <strong>{category}</strong>{' '}
              </p>

              <ButtonWithIcon
                icon={FiX}
                onClick={() => {
                  setSearchByRestaurantName('');
                  setIsToClearFormData(!isToClearFormData);
                  setCategory('');
                }}
              >
                Cancelar pesquisa
              </ButtonWithIcon>
            </div>
          )}

          {isLoading && (
            <div className="loading">
              <Loading />
            </div>
          )}

          {restaurants.length === 0 && (
            <div className="no-restaurants">
              <p>Não foi encontrado nenhum restaurante :(</p>
            </div>
          )}

          {restaurants.map(restaurant => (
            <RestaurantCard
              restaurantUrlImage={restaurant.url}
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              description={restaurant.description}
            />
          ))}
        </ContentList>
      </Content>
    </StylesContainer>
  );
};

export default Search;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
