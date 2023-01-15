import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

type Props = {};

export const Search = (props: Props) => {
  return (
    <Flex
      flexGrow={1}
      px={3}
      align='center'>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={
            <SearchIcon
              color='gray.400'
              mb={1}
            />
          }
        />
        <Input
          placeholder='Enter query'
          fontSize='10pt'
          _placeholder={{ color: 'gray.500' }}
          _hover={{
            bg: 'white',
            border: '1px solid',
            borderColor: 'brand.100',
          }}
          _focus={{
            outline: 'none',
            border: '1px solid',
            borderColor: 'brand.100',
          }}
          height='34px'
          bg='gray.50'
        />
      </InputGroup>
    </Flex>
  );
};
