import { ReactElement, useCallback, useRef, useState } from 'react';
import Modal from 'react-modal';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import { FaRegStar, FaStar } from 'react-icons/fa';

import { useAuth } from '../../../hooks/auth';

import { api } from '../../../services/apiClient';

import { StylesContainer } from './styles';
import Button from '../../Button';

interface IRateModalProps {
  restaurantId: number;
  isModalOpen: boolean;
  onRequestClose: () => void;
}
const RateModal = ({
  isModalOpen,
  onRequestClose,
  restaurantId,
}: IRateModalProps): ReactElement => {
  const { user } = useAuth();

  const rateFormRef = useRef<FormHandles>(null);

  const [quantityOfStars, setQuantityOfStars] = useState(0);
  const [rating, setRating] = useState(0);

  const stars = [];

  for (let i = 1; i < 6; i += 1) {
    stars.push(
      <div
        role="button"
        onClick={() => setRating(i)}
        onMouseEnter={() => setQuantityOfStars(i)}
        onMouseLeave={() => setQuantityOfStars(0)}
      >
        {rating >= i ? (
          <FaStar size={28} />
        ) : (
          <>
            <FaRegStar
              style={quantityOfStars >= i && { display: 'none' }}
              size={28}
            />
            <FaStar
              style={quantityOfStars < i && { display: 'none' }}
              size={28}
            />
          </>
        )}
      </div>,
    );
  }

  const handleRateRestaurant = useCallback(async () => {
    try {
      const userData = {
        clientId: Number(user.sub),
        restaurantId: Number(restaurantId),
        value: rating,
      };

      await api
        .post('/rating', userData)
        .then(response => {
          if (!response.data) {
            return toast.error('Erro ao avaliar o restaurante');
          }

          toast.success('Restaurante avaliado com sucesso');
          setRating(0);
          onRequestClose();
        })
        .catch(error => {
          setRating(0);
          onRequestClose();
          return toast.error(error.response.data.message);
        });
    } catch (err) {
      return toast.error('Erro inesperado. Tente novamente mais tarde');
    }
  }, [onRequestClose, rating, restaurantId, user]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <StylesContainer>
        <h2>Avalie este restaurante</h2>

        <p>Para avaliar, nos diga quantas estrelas você daria </p>

        <Form onSubmit={handleRateRestaurant} ref={rateFormRef}>
          <div className="stars">{stars.map(star => star)}</div>

          {rating > 0 && <Button type="submit">Avaliar</Button>}
        </Form>
      </StylesContainer>
    </Modal>
  );
};

export default RateModal;
