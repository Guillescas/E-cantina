import { ReactElement } from 'react';
import { FiPlus } from 'react-icons/fi';
import { formatPrice } from '../../utils/formatPriceToBR';

import { StylesContainer } from './styles';

interface IProductProps {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
  urlImage?: string;
  amount: number;
  observation?: string;
  cartItemId: number;
}

interface IProductCardProps {
  product: IProductProps;
}

const VerticalProductCard = ({ product }: IProductCardProps): ReactElement => {
  return (
    <StylesContainer>
      {product && product.urlImage ? (
        <img
          src={`http://localhost:8080${product && product.urlImage}`}
          alt={`Imagem de ${product && product.name}`}
          id="vertocal-product-card-image"
        />
      ) : (
        <img
          src="/assets/food.jpeg"
          alt={`Imagem de ${product && product.name}`}
          id="vertocal-product-card-image"
        />
      )}

      <div className="infos">
        <h2>Cheese burger</h2>
        <p>Pão, carne e muito queijo</p>
        <span>{formatPrice(23.9)}</span>
      </div>

      <div className="icon">
        <FiPlus size={22} />
        Ver mais
      </div>
    </StylesContainer>
  );
};

export default VerticalProductCard;
