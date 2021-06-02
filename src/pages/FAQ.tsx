import { ReactElement, useState } from 'react';
import {
  StylesContainer,
  StylesAnswer,
  StylesAnswer2,
  StylesAnswer3,
  StylesAnswer4,
  StylesAnswer5,
  StylesAnswer6,
} from '../styles/Pages/FAQ';
import TopMenu from '../components/TopMenu';

const FAQ = (): ReactElement => {
  const [isBoxFAQOpen, setIsBoxFAQOpen] = useState(false);
  const [isBoxFAQOpen2, setIsBoxFAQOpen2] = useState(false);
  const [isBoxFAQOpen3, setIsBoxFAQOpen3] = useState(false);
  const [isBoxFAQOpen4, setIsBoxFAQOpen4] = useState(false);
  const [isBoxFAQOpen5, setIsBoxFAQOpen5] = useState(false);
  const [isBoxFAQOpen6, setIsBoxFAQOpen6] = useState(false);
  return (
    <div>
      <StylesContainer>
        <TopMenu />
        <div className="body">
          <div className="FAQ_titulo">FAQ</div>
          <div className="container">
            <div className="accordion">
              <div className="accordion-item" id="question1">
                <a
                  className="according-link"
                  role="button"
                  onClick={() => setIsBoxFAQOpen(!isBoxFAQOpen)}
                >
                  O que é nosso site faz?
                </a>
                <StylesAnswer isBoxFAQOpen={isBoxFAQOpen}>
                  <p>
                    Nosso site auxilia clientes de restaurantes e lanchonetes
                    para que eles consigam adquirir os produtos desses
                    estabelecimentos sem passar pela parte burocrática como:
                    entrar em filas e podendo realizar o pagamento no local,
                    deixando o processo mais rápido e fluído;
                  </p>
                </StylesAnswer>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="accordion">
              <div className="accordion-item" id="question1">
                <a
                  className="according-link"
                  role="button"
                  onClick={() => setIsBoxFAQOpen2(!isBoxFAQOpen2)}
                >
                  Como funciona nosso site?
                </a>
                <StylesAnswer2 isBoxFAQOpen2={isBoxFAQOpen2}>
                  <p>
                    O cliente do restaurante faz pelo site seu pedido,
                    informando qual é o produto desejado e realizando seu
                    pagamento, (podendo ser pagamento por dinheiro ou cartão de
                    crédito ou débito,) assim nós geramos um QR code no qual
                    será apresentado no local, assim o estabelecimento apenas
                    verifica se o QR code condiz com o pedido, se sim a
                    lanchonete/restaurante entrega o produto ao pedinte;
                  </p>
                </StylesAnswer2>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="accordion">
              <div className="accordion-item" id="question1">
                <a
                  className="according-link"
                  role="button"
                  onClick={() => setIsBoxFAQOpen3(!isBoxFAQOpen3)}
                >
                  É preciso fazer algum cadastro?
                </a>
                <StylesAnswer3 isBoxFAQOpen3={isBoxFAQOpen3}>
                  <p>
                    Sim, o cadastro é necessário tanto para o cliente quanto
                    para o restaurante, com funcionalidades próprias para cada
                    um;
                  </p>
                </StylesAnswer3>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="accordion">
              <div className="accordion-item" id="question1">
                <a
                  className="according-link"
                  role="button"
                  onClick={() => setIsBoxFAQOpen4(!isBoxFAQOpen4)}
                >
                  O site realiza as entregas?
                </a>
                <StylesAnswer4 isBoxFAQOpen4={isBoxFAQOpen4}>
                  <p>
                    Não, nós não fazemos entregas, o intuito é facilitar o
                    processo de compra nos estabelecimentos;
                  </p>
                </StylesAnswer4>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="accordion">
              <div className="accordion-item" id="question1">
                <a
                  className="according-link"
                  role="button"
                  onClick={() => setIsBoxFAQOpen5(!isBoxFAQOpen5)}
                >
                  Como funcionam os métodos de pagamento?
                </a>
                <StylesAnswer5 isBoxFAQOpen5={isBoxFAQOpen5}>
                  <p>
                    O pagamento pode ser realizado tanto por cartão de crédito
                    ou débito, assim pode ser informado dentro do nosso site, já
                    pagamento por dinheiro deverá ser informado durante a
                    realização do pedido, assim o restaurante já terá essa
                    informação em mãos e receberá o dinheiro na hora da retirada
                    do produto;
                  </p>
                </StylesAnswer5>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="accordion">
              <div className="accordion-item" id="question1">
                <a
                  className="according-link"
                  role="button"
                  onClick={() => setIsBoxFAQOpen6(!isBoxFAQOpen6)}
                >
                  Como entrar em contato com o suporte?
                </a>
                <StylesAnswer6 isBoxFAQOpen6={isBoxFAQOpen6}>
                  <p>
                    Se caso acontecer algum problema, envie um e-mail para
                    ecantinapucpr@gmail.com que resolveremos o problema.
                  </p>
                </StylesAnswer6>
              </div>
            </div>
          </div>
        </div>
      </StylesContainer>
    </div>
  );
};

export default FAQ;
