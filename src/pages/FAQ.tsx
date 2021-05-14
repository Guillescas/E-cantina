import { ReactElement } from 'react';
import { StylesContainer } from '../styles/Pages/FAQ';
import TopMenu from '../components/TopMenu';

const FAQ = (): ReactElement => {
  return (
    <div>
      <StylesContainer>
        <TopMenu />
        <div>
          <div className="FAQ_titulo">FAQ</div>
          <div>
            P1: O que é nosso site faz? R: Nosso site auxilia clientes de
            restaurantes e lanchonetes para que eles consigam adquirir os
            produtos desses estabelecimentos sem passar pela parte burocrática
            como: entrar em filas e podendo realizar o pagamento no local,
            deixando o processo mais rápido e fluído;
          </div>
          <div>
            P2: Como funciona nosso site? R: O cliente do restaurante faz pelo
            site seu pedido, informando qual é o produto desejado e realizando
            seu pagamento, (podendo ser pagamento por dinheiro ou cartão de
            crédito ou débito,) assim nós geramos um QR code no qual será
            apresentado no local, assim o estabelecimento apenas verifica se o
            QR code condiz com o pedido, se sim a lanchonete/restaurante entrega
            o produto ao pedinte;
          </div>
          <div>
            P3: É preciso fazer algum cadastro? R: Sim, o cadastro é necessário
            tanto para o cliente quanto para o restaurante, com funcionalidades
            próprias para cada um;
          </div>
          <div>
            P4: O site realiza as entregas? R: Não, nós não fazemos entregas, o
            intuito é facilitar o processo de compra nos estabelecimentos;
          </div>
          <div>
            P5: Como funcionam os métodos de pagamento? R: O pagamento pode ser
            realizado tanto por cartão de crédito ou débito, assim pode ser
            informado dentro do nosso site, já pagamento por dinheiro deverá ser
            informado durante a realização do pedido, assim o restaurante já
            terá essa informação em mãos e receberá o dinheiro na hora da
            retirada do produto;
          </div>
          <div>
            P6: Como entrar em contato com o suporte? R: Se caso acontecer algum
            problema, envie um e-mail para ecantinapucpr@gmail.com que
            resolveremos o problema.
          </div>
        </div>
      </StylesContainer>
    </div>
  );
};

export default FAQ;
