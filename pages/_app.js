import { App } from 'konsta/react';
import '@/styles/globals.css'
import { GlobalContextProvider } from '../context/globalContext'

export default function MyApp({ Component, pageProps }) {
  return (
    <App theme="ios">
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </App>
  );
};


