import { ReactElement } from 'react';
import { toast } from 'react-toastify';

import { api } from '../../services/apiClient';

import { StylesContainer } from './styles';

interface ICreditCardProps {
  id: number;
  nickname: string;
  cardNumber: string;
}

const CreditCard = ({
  id,
  nickname,
  cardNumber,
}: ICreditCardProps): ReactElement => {
  const deleteCreditCard = (cardId: number) => {
    api
      .delete(`/card/${cardId}`)
      .then(() => toast.success('Cartão excluído com sucesso'))
      .catch(error => toast.error(error.response.message));
  };

  return (
    <StylesContainer>
      <h3>{nickname}</h3>
      <p>•••• {cardNumber.slice(-4)}</p>

      <button type="button" onClick={() => deleteCreditCard(id)}>
        Excluir
      </button>
    </StylesContainer>
  );
};

export default CreditCard;
