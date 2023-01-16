import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React, { FC } from 'react';

type TProps = {
  user?: User | null;
};

export const Search: FC<TProps> = ({ user }) => {
  return (
    <Flex
      flexGrow={1}
      maxWidth={user ? 'auto' : '600px'}
      px={2}
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
