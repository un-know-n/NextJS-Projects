import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/700.css';

import { extendTheme } from '@chakra-ui/react';

import { Button } from './button';

export const theme = extendTheme({
  colors: {
    brand: {
      100: '#b87df9',
      200: '#af6df9',
    },
  },
  fonts: {
    body: 'Open Sans, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.300',
      },
    },
  },
  components: {
    Button,
  },
});
