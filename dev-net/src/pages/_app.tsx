import { theme } from '@/chakra/theme';
import { Layout } from '@/components/layout/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </Head>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}
