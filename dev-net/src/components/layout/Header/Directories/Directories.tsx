import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';

import { Communities } from './Communities/Communities';

type Props = {};

export const Directories = (props: Props) => {
  return (
    <Menu>
      <MenuButton
        cursor='pointer'
        padding='0px 6px'
        borderRadius='4px'
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
        mr={2}
        ml={4}>
        <Flex
          alignItems='center'
          justifyContent='space-between'
          width={{ base: 'auto', lg: '200px' }}>
          <Flex alignItems='center'>
            <Icon
              fontSize={24}
              mr={{ base: 1, md: 2 }}
              as={AiOutlineHome}
            />
            <Box
              display={{ base: 'none', lg: 'flex' }}
              flexDirection='column'
              fontSize='10pt'>
              <Text fontWeight={600}>Home</Text>
            </Box>
          </Flex>
          <ChevronDownIcon color='gray.500' />
        </Flex>
      </MenuButton>
      <MenuList
        maxHeight='300px'
        overflowX='hidden'>
        <Communities />
      </MenuList>
    </Menu>
  );
};
