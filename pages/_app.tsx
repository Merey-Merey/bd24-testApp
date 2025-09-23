import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import '@/styles/globals.scss';

// Для TypeScript типов
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Используем layout если он определен для страницы
  const getLayout = Component.getLayout ?? ((page) => page);
  
  return getLayout(<Component {...pageProps} />);
}