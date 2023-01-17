import { auth, firestore } from '@/firebase/firebase.config';
import { Button, Flex, Image } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

type Props = {};

export const OAuthButtons = (props: Props) => {
  const [signInWithGoogle, userCred, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      providerData: user.providerData,
    };
    await setDoc(
      doc(firestore, 'users', user.uid),
      JSON.parse(JSON.stringify(newUser)),
    );
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

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
