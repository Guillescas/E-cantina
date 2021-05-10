import 'react-toastify/dist/ReactToastify.css';

import { ReactElement } from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';

import AppProvider from '../hooks';

import { GlobalStyles } from '../styles/globals';

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <AppProvider>
      <GlobalStyles />
      <ToastContainer autoClose={4000} />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
