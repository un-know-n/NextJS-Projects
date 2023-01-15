import { AuthModal } from '@/components/shared/Modals/Auth/AuthModal';
import { Flex } from '@chakra-ui/react';
import React from 'react';

import { AuthButtons } from './AuthButtons/AuthButtons';

type Props = {};

export const RightContent = (props: Props) => {
  return (
    <>
      <AuthModal />
      <Flex>
        <AuthButtons />
      </Flex>
    </>
  );
};
