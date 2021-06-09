import { ReactElement, useState } from 'react';
import moment from 'moment';
import QRCode from 'qrcode.react';

import { formatPrice } from '../../utils/formatPriceToBR';

import { StylesContainer } from './styles';

interface IOrderCardProps {
  order: any;
  orderAt: string;
  totalPrice: number;
  orderRestaurantName: string;
  orderRestaurantImage: string;
}

const OrderCard = ({
  order,
  orderAt,
  totalPrice,
  orderRestaurantName,
  orderRestaurantImage,
}: IOrderCardProps): ReactElement => {
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);

  return (
    <StylesContainer>
      <img
        src={`http://localhost:8080${orderRestaurantImage}`}
        alt={`Imagem de ${orderRestaurantName}`}
      />

      <div className="infos">
        <h2>{orderRestaurantName}</h2>
        <p>
          Pedido feito em:{' '}
          <strong>{moment(orderAt).format('DD/MM/YYYY')}</strong>
        </p>
        <p>
          Total do pedido: <strong>{formatPrice(totalPrice)}</strong>
        </p>
      </div>

      <div className="see-qr-code">
        {isQRCodeOpen ? (
          <>
            <button type="button" onClick={() => setIsQRCodeOpen(false)}>
              Fechar QR Code
            </button>
            <QRCode value={`${order}`} bgColor="#f1f1f1" renderAs="svg" />
          </>
        ) : (
          <button type="button" onClick={() => setIsQRCodeOpen(true)}>
            Ver QR Code
          </button>
        )}
      </div>
    </StylesContainer>
  );
};

export default OrderCard;
