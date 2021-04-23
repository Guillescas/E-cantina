import { ReactElement } from "react";

function MyApp({ Component, pageProps }): ReactElement {
  return <Component {...pageProps} />
};

export default MyApp;
