import { ReactElement, useCallback, useRef, useState } from 'react';
import Modal from 'react-modal';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { FiAlignLeft } from 'react-icons/fi';

import TextArea from '../../Inputs/TextArea';
import QuantitySelector from '../../QuantitySelector';

import getvalidationErrors from '../../../utils/getValidationErrors';

import { StylesContainer } from './styles';
import Button from '../../Button';
import { formatPrice } from '../../../utils/formatPriceToBR';

interface IProductModalProps {
  isModalOpen: boolean;
  onRequestClose: () => void;
  name: string;
  price: number;
  description: string;
}

interface IOrderFormData {
  observation: string;
  quantity: string;
}

const ProductModal = ({
  isModalOpen,
  onRequestClose,
  name,
  price,
  description,
}: IProductModalProps): ReactElement => {
  const loginFormRef = useRef<FormHandles>(null);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = useCallback(
    async (data: IOrderFormData) => {
      setIsLoading(true);
      try {
        loginFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          quantity: Yup.number().required('Quantidade obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        router.push('/dashboard');
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(err);

          loginFormRef.current?.setErrors(errors);
        }
      }
      setIsLoading(false);
    },
    [router],
  );

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
            <span>Produto: </span> {name && name}
          </p>
          <p>
            <span>Descrição: </span> {description && description}
          </p>
        </div>

        <Form ref={loginFormRef} onSubmit={handleSubmit}>
          <div>
            <TextArea
              name="observation"
              placeholder="observation"
              icon={FiAlignLeft}
              label="Observações"
            />
          </div>

          <span className="quantity-selector-span">Quantidade</span>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

          <div className="resume">
            <p>
              <span>Total: </span>{' '}
              {price && formatPrice(Number(price) * quantity)}
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
