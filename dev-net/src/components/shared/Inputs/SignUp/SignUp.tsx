import { authModalState } from '@/atoms/authModal.atom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

type Props = {};

export const SignUp = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [signupForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onSubmit = () => {};

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form>
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

      <Button
        width='100%'
        height='36px'
        mt={2}
        mb={2}
        type='submit'>
        Sign Up
      </Button>

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
