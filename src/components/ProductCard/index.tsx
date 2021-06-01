import { ReactElement } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useProductModal } from '../../hooks/productModal';

import { formatPrice } from '../../utils/formatPriceToBR';
import ProductModal from '../Modals/ProductModal';

import { StylesContainer } from './styles';

interface IProductProps {
  name: string;
  description?: string;
  price: number;
}

const ProductCard = ({
  name,
  description,
  price,
}: IProductProps): ReactElement => {
  const {
    productModalIsOpen,
    closeProductModal,
    setModalProductIsOpen,
  } = useProductModal();

  return (
    <StylesContainer>
      <ProductModal
        isModalOpen={productModalIsOpen}
        onRequestClose={closeProductModal}
        name={name}
        price={price}
        description={description}
      />

      <img src="/assets/hamburger.jpeg" alt={`Imagem de ${name}`} />
      <h2>{name}</h2>
      <p>{description}</p>
      <span>{formatPrice(price)}</span>

      <button type="button" onClick={() => setModalProductIsOpen(true)}>
        <FiPlus />
        <p>Ver mais</p>
      </button>
    </StylesContainer>
  );
};

export default ProductCard;
