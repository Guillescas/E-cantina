import { ReactElement } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { AiTwotoneFire } from 'react-icons/ai';

import LeftDashboardMenu from '../components/LeftDashboardMenu';
import ProductCard from '../components/ProductCard';
import TopDashboardMenu from '../components/TopDashboardMenu';

import {
  StylesContainer,
  Content,
  RestaurantContent,
} from '../styles/Pages/Restaurant';
import VerticalProductCard from '../components/VerticalProductCard';

const Restaurant = (): ReactElement => {
  return (
    <StylesContainer>
      <TopDashboardMenu />

      <Content>
        <LeftDashboardMenu />

        <RestaurantContent>
          <img src="/assets/restaurant.jpeg" alt="Imagem de" />

          <div className="main">
            <div className="title">
              <h1>Restaurante do seu zé</h1>

              <div className="rating">
                <span>3.7</span>
                <FaStar size={20} />
                <FaStar size={20} />
                <FaStarHalfAlt size={20} />
                <FaRegStar size={20} />
                <FaRegStar size={20} />
              </div>
            </div>

            <div className="description">
              <p>
                Um restaurante com comidas divesificadas e um bom lugar para
                conversas e reuniões.
              </p>
            </div>

            <div className="section hot-sale">
              <h1>
                Promoção <AiTwotoneFire />
              </h1>
              <div className="cards">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
            </div>

            <div className="section products">
              <h1>Mais produtos</h1>
              <div className="vertical-cards">
                <VerticalProductCard />
              </div>
            </div>
          </div>
        </RestaurantContent>
      </Content>
    </StylesContainer>
  );
};

export default Restaurant;
