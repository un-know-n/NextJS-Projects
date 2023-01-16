import { theme } from '@/chakra/theme';
import { Layout } from '@/components/layout/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';

import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
