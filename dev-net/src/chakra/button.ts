import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: '10px',
    fontSize: '10pt',
    fontWeight: '700',
    _focus: {
      boxShadow: 'none',
    },
  },
  sizes: {
    sm: {
      fontSize: '8pt',
    },
    md: {
      fontSize: '10pt',
    },
  },
  variants: {
    solid: {
      color: 'white',
      bg: 'brand.200',
      _hover: {
        bg: 'brand.100',
      },
    },
    outline: {
      color: 'brand.100',
      border: '2px solid',
      borderColor: 'brand.100',
    },
    oauth: {
      height: '34px',
      border: '2px solid',
      borderColor: 'gray.300',
      _hover: {
        bg: 'gray.50',
      },
    },
  },
};
