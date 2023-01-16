import { authModalState } from '@/atoms/authModal.atom';
import { auth } from '@/firebase/firebase.config';
import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { BsDot } from 'react-icons/bs';
import { GoMailRead } from 'react-icons/go';
import { HiOutlineCode } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';

type Props = {};

export const ResetPassword = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendPasswordResetEmail(email);
    setSuccess(true);
  };
  return (
    <Flex
      direction='column'
      alignItems='center'
      width='100%'>
      <Icon
        as={HiOutlineCode}
        color='brand.100'
        fontSize={40}
        mb={2}
      />
      <Text
        fontWeight={700}
        mb={2}>
        Reset your password
      </Text>
      {success ? (
        <Text
          mb={4}
          display='flex'
          alignItems='center'>
          Check your email{' '}
          <GoMailRead style={{ marginLeft: '10px', fontSize: '24px' }} />
        </Text>
      ) : (
        <>
          <Text
            fontSize='sm'
            textAlign='center'
            mb={2}>
            Enter the email associated with your account and we will send you a
            reset link
          </Text>
          <form
            onSubmit={onSubmit}
            style={{ width: '100%' }}>
            <Input
              required
              name='email'
              placeholder='email'
              type='email'
              mb={2}
              onChange={(event) => setEmail(event.target.value)}
              fontSize='10pt'
              _placeholder={{ color: 'gray.500' }}
              _hover={{
                bg: 'white',
                border: '1px solid',
                borderColor: 'blue.500',
              }}
              _focus={{
                outline: 'none',
                bg: 'white',
                border: '1px solid',
                borderColor: 'blue.500',
              }}
              bg='gray.50'
            />
            <Text
              textAlign='center'
              fontSize='10pt'
              color='red'>
              {error?.message}
            </Text>
            <Button
              width='100%'
              height='36px'
              mb={2}
              mt={2}
              type='submit'
              isLoading={sending}>
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex
        alignItems='center'
        fontSize='9pt'
        color='blue.500'
        fontWeight={700}
        cursor='pointer'>
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'login',
            }))
          }>
          Log In
        </Text>
        <Icon as={BsDot} />
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'signup',
            }))
          }>
          Sign Up
        </Text>
      </Flex>
    </Flex>
  );
};
