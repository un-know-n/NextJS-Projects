import { useDirectory } from '@/hooks/useDirectory';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useOutsideClick,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

import { Communities } from './Communities/Communities';

type Props = {};

export const Directories = (props: Props) => {
  const { directoryState, toggleMenu } = useDirectory();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useOutsideClick({
    ref: menuButtonRef,
    handler: () => directoryState.isOpen && toggleMenu(),
  });

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor='pointer'
        padding='0px 6px'
        borderRadius='4px'
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
        mr={2}
        ml={4}
        ref={menuButtonRef}
        onClick={toggleMenu}>
        <Flex
          alignItems='center'
          justifyContent='space-between'
          width={{ base: 'auto', lg: '200px' }}>
          <Flex alignItems='center'>
            {directoryState.selectedMenuItem.communityImageURL ? (
              <Image
                src={directoryState.selectedMenuItem.communityImageURL}
                alt='Community image'
                mr={{ base: 1, md: 2 }}
                boxSize='24px'
                borderRadius='full'
                fit='cover'
              />
            ) : (
              <Icon
                fontSize={24}
                mr={{ base: 1, md: 2 }}
                as={directoryState.selectedMenuItem.icon}
                color={directoryState.selectedMenuItem.iconColor}
              />
            )}
            <Box
              display={{ base: 'none', lg: 'flex' }}
              flexDirection='column'
              fontSize='10pt'>
              <Text fontWeight={600}>
                {directoryState.selectedMenuItem.communityName}
              </Text>
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
