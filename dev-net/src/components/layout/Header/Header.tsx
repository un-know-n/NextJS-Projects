import { defaultMenuItem } from '@/atoms/directoryMenu.atom';
import { auth } from '@/firebase/firebase.config';
import { useDirectory } from '@/hooks/useDirectory';
import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Directories } from './Directories/Directories';
import { RightContent } from './RightContent/RightContent';
import { Search } from './Search/Search';

type Props = {};

export const Header = (props: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  return (
    <Flex
      bg='white'
      height='44px'
      padding='6px 12px'
      align='center'
      justify={{ md: 'space-between' }}>
      <Flex
        align='center'
        width={{ base: '40px', md: 'auto' }}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
        cursor='pointer'>
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

      {user && <Directories />}
      <Search user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
