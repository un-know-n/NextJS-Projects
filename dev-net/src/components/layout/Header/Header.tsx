import { Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { RightContent } from './RightContent/RightContent';
import { Search } from './Search/Search';

type Props = {};

export const Header = (props: Props) => {
  return (
    <Flex
      bg='white'
      height='44px'
      padding='6px 12px'
      align='center'>
      <Link href='/'>
        <Flex align='center'>
          <Image
            src='/logo.svg'
            alt='Logo'
            height='24px'
          />
          <Text
            fontSize='xl'
            fontWeight='light'
            display={{ base: 'none', md: 'unset' }}>
            DevNet
          </Text>
        </Flex>
      </Link>
      {/* <Directory/> */}
      <Search />
      <RightContent />
    </Flex>
  );
};
