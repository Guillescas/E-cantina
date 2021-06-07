import { ReactElement, useEffect, useState } from 'react';
import moment from 'moment';
import QRCode from 'qrcode.react';

import { formatPrice } from '../../utils/formatPriceToBR';

import { StylesContainer } from './styles';

interface IProductProps {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  urlImage: string;
}

interface IProductListProps {
  id: number;
  quantity: number;
  value: number;
  total: number;
  description: string;
  product: IProductProps;
}

interface IOrderCardProps {
  id: number;
  orderAt: string;
  totalPrice: number;
  productList: IProductListProps[];
}

const OrderCard = ({
  id,
  orderAt,
  totalPrice,
  productList,
}: IOrderCardProps): ReactElement => {
  const [productsNames, setProductsNames] = useState([]);

  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);

  useEffect(() => {
    setProductsNames(productList.map(product => product.product.name));
  }, [productList]);

  return (
    <StylesContainer>
      <img
        src="/assets/restaurant.jpeg"
        alt={`Imagem de ${productList[0].product.name}`}
      />

      <div className="infos">
        <h2>{productsNames}</h2>
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
            <QRCode value={`${id}`} bgColor="#f1f1f1" renderAs="svg" />
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
