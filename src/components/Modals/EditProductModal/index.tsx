import { ReactElement, useCallback, useRef, useState } from 'react';
import Modal from 'react-modal';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiAlignLeft, FiDollarSign } from 'react-icons/fi';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import TextArea from '../../Inputs/TextArea';
import QuantitySelector from '../../QuantitySelector';
import Button from '../../Button';

import { StylesContainer } from './styles';
import Input from '../../Inputs/Input';
import { api } from '../../../services/apiClient';
import getvalidationErrors from '../../../utils/getValidationErrors';

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

interface IFormData {
  id: number;
  price: number;
  description: string;
}

const ProductModal = ({
  isModalOpen,
  onRequestClose,
  setModalProductIsOpen,
  product,
  restaurantId,
}: IProductModalProps): ReactElement => {
  const editProductFormRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      setIsLoading(true);
      try {
        editProductFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          price: Yup.string().required('Preço obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const productData = {
          id: product.id,
          price: data.price,
          description: data.description,
        };

        api
          .patch(`/product/${product.id}`, productData)
          .then(() => {
            toast.success('Produto atualizado com sucesso');
          })
          .catch(error => {
            toast.error(error.response.data.message);
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getvalidationErrors(err);

          editProductFormRef.current?.setErrors(errors);
        }
      }
      setIsLoading(false);
    },
    [product],
  );

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <StylesContainer>
        <h2>Editar produto</h2>

        <Form ref={editProductFormRef} onSubmit={handleSubmit}>
          <div>
            <Input
              name="price"
              type="number"
              placeholder="Preço"
              icon={FiDollarSign}
              label="Preço"
            />

            <TextArea
              name="description"
              placeholder="description"
              icon={FiAlignLeft}
              label="Descrição"
            />
          </div>

          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </Form>
      </StylesContainer>
    </Modal>
  );
};

export default ProductModal;
