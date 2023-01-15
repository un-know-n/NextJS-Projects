import { authModalState } from '@/atoms/authModal.atom';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type Props = {};

export const AuthButtons = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <>
      <Button
        variant='outline'
        height='34px'
        display={{ base: 'none', sm: 'flex' }}
        width={{ base: '70px', md: '110px' }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: 'login' })}>
        Log In
      </Button>
      <Button
        height='34px'
        display={{ base: 'none', sm: 'flex' }}
        width={{ base: '70px', md: '110px' }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: 'signup' })}>
        Sign Up
      </Button>
    </>
  );
};
