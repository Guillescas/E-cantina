import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import Loading from '../components/Loading';
import RestaurantCard from '../components/RestaurantCard';
import SEO from '../components/SEO';
import TopDashboardMenu from '../components/TopDashboardMenu';
import Categories from '../components/Categories';
import ButtonWithIcon from '../components/ButtonWithIcon';

import { api } from '../services/apiClient';

import { withSSRAuth } from '../utils/withSSRAuth';

import {
  StylesContainer,
  Content,
  ContentList,
} from '../styles/Pages/Dashboard';
import { useSearchRestaurantBy } from '../hooks/searchRestaurantBy';

const Dashboard = (): ReactElement => {
  const {
    restaurants,
    setRestaurants,
    category,
    setCategory,
    searchByRestaurantName,
    setSearchByRestaurantName,
    isToClearFormData,
    setIsToClearFormData,
  } = useSearchRestaurantBy();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/restaurant?nameRestaurant=${searchByRestaurantName}`)
      .then(response => {
        setRestaurants(response.data.content);
        setIsLoading(false);
      })
      .catch(() => {
        return toast.error('Houve um erro inesperado. Tente mais tarde');
      });
  }, [searchByRestaurantName, setRestaurants]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/restaurant?nameCategory=${category}`)
      .then(response => {
        setIsLoading(false);
        setRestaurants(response.data.content);
      })
      .catch(() => {
        return toast.error('Houve um erro inesperado. Tente mais tarde');
      });
  }, [category, setRestaurants]);

  return (
    <StylesContainer>
      <SEO title="Dashboard" />

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
                  setSearchByRestaurantName('');
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
                <strong>{searchByRestaurantName}</strong>{' '}
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

export default Dashboard;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
