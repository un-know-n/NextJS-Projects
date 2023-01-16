import { auth } from '@/firebase/firebase.config';
import { Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

type Props = {};

export const OAuthButtons = (props: Props) => {
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);

  return (
    <Flex
      direction='column'
      width='100%'>
      <Button
        variant='oauth'
        mb={2}
        isLoading={loadingGoogle}
        onClick={() => signInWithGoogle()}>
        <Image
          alt='Google'
          src='/google.png'
          height='20px'
          mr={4}
        />
        Continue with Google
      </Button>
      <Button variant='oauth'>Some another provider</Button>
    </Flex>
  );
};
