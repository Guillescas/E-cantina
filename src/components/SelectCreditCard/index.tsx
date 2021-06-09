import { ReactElement } from 'react';

import { StylesContainer } from './styles';

interface ISelectCreditCardProps {
  id: number;
  nickname: string;
  cardNumber: string;
  selected: boolean;
  setSelectedCreditCardId: (selectedCreditCard: number) => void;
}

const SelectCreditCard = ({
  id,
  nickname,
  cardNumber,
  selected = false,
  setSelectedCreditCardId,
}: ISelectCreditCardProps): ReactElement => {
  return (
    <StylesContainer
      selected={selected}
      onClick={() => setSelectedCreditCardId(id)}
    >
      <h3>{nickname}</h3>
      <p>•••• {cardNumber.slice(-4)}</p>

      <button type="button">{selected ? 'Selecionado' : 'Selecionar'}</button>
    </StylesContainer>
  );
};

export default SelectCreditCard;
