import { authModalState } from '@/atoms/authModal.atom';
import { takeAuthError } from '@/firebase/errors';
import { auth } from '@/firebase/firebase.config';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type Props = {};

export const SignUp = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState('');

  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  // Create user, using email and password
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError('');
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name='email'
        placeholder='Your Email'
        type='email'
        mb={2}
        onChange={onChange}
        fontSize='10pt'
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'brand.200',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'brand.200',
        }}
        bg='gray.50'
      />
      <Input
        required
        name='password'
        placeholder='Your Password'
        type='password'
        mb={2}
        onChange={onChange}
        fontSize='10pt'
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'brand.200',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'brand.200',
        }}
        bg='gray.50'
      />
      <Input
        required
        name='confirmPassword'
        placeholder='Confirm Password'
        type='password'
        mb={2}
        onChange={onChange}
        fontSize='10pt'
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'brand.200',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'brand.200',
        }}
        bg='gray.50'
      />

      <Text
        textAlign='center'
        fontSize='10pt'
        color='red'>
        {formError || userError?.code
          ? `Error: ${takeAuthError(userError!.code)}`
          : null}
      </Text>

      <Button
        width='100%'
        height='36px'
        mt={2}
        mb={2}
        type='submit'
        isLoading={loading}>
        Sign Up
      </Button>

      <Flex
        justifyContent='center'
        mb={2}>
        <Text
          fontSize='9pt'
          mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize='9pt'
          color='blue.500'
          cursor='pointer'
          onClick={() =>
            setAuthModalState({ open: true, view: 'resetPassword' })
          }>
          Reset
        </Text>
      </Flex>

      <Flex
        fontSize='9pt'
        justifyContent='center'>
        <Text mr={1}>Already have an account?</Text>
        <Text
          color='blue.500'
          fontWeight='bold'
          cursor='pointer'
          onClick={() => setAuthModalState({ open: true, view: 'login' })}>
          Log In
        </Text>
      </Flex>
    </form>
  );
};
