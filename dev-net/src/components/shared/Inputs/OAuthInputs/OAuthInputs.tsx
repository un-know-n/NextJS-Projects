import { authModalState } from '@/atoms/authModal.atom';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { LogIn } from './LogIn/LogIn';
import { SignUp } from './SignUp/SignUp';

type Props = {};

export const OAuthInputs = (props: Props) => {
  const modalState = useRecoilValue(authModalState);
  return (
    <Flex>
      {modalState.view === 'login' && <LogIn />}
      {modalState.view === 'signup' && <SignUp />}
    </Flex>
  );
};
