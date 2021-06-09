import { ReactElement, useCallback, useRef, useState } from 'react';
import Modal from 'react-modal';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiAlignLeft } from 'react-icons/fi';

import TextArea from '../../Inputs/TextArea';
import QuantitySelector from '../../QuantitySelector';
import Button from '../../Button';

import { formatPrice } from '../../../utils/formatPriceToBR';

import { useCart } from '../../../hooks/cart';

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

interface IProductModalProps {
  isModalOpen: boolean;
  onRequestClose: () => void;
  setModalProductIsOpen: (isOpen: boolean) => void;
  product: IProductProps;
  restaurantId: number;
}

const ProductModal = ({
  isModalOpen,
  onRequestClose,
  setModalProductIsOpen,
  product,
  restaurantId,
}: IProductModalProps): ReactElement => {
  const { addProduct } = useCart();

  const loginFormRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState('');

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const formattedProduct = {
        ...product,
        restaurantId,
        observation,
        amount: quantity,
      };

      addProduct(formattedProduct);
      setModalProductIsOpen(false);
      setObservation('');
      setQuantity(1);
    } catch (err) {
      // console.log(err);
    }
    setIsLoading(false);
  }, [
    addProduct,
    observation,
    product,
    quantity,
    restaurantId,
    setModalProductIsOpen,
  ]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <StylesContainer>
        <h2>Adicionar produto ao carrinho</h2>

        <div className="resume">
          <p>
            <span>Produto: </span> {product && product.name}
          </p>
          <p>
            <span>Descrição: </span> {product && product.description}
          </p>
        </div>

        <Form ref={loginFormRef} onSubmit={handleSubmit}>
          <div>
            <TextArea
              name="observation"
              placeholder="observation"
              icon={FiAlignLeft}
              label="Observações"
              value={observation}
              onChange={event => setObservation(event.target.value)}
            />
          </div>

          <span className="quantity-selector-span">Quantidade</span>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

          <div className="resume">
            <p>
              <span>Total: </span>{' '}
              {product && formatPrice(Number(product.price) * quantity)}
            </p>
          </div>

          <Button type="submit" isLoading={isLoading}>
            Adicionar ao carrinho
          </Button>
        </Form>
      </StylesContainer>
    </Modal>
  );
};

export default ProductModal;
