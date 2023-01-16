import { AuthModal } from '@/components/shared/Modals/Auth/AuthModal';
import { Flex } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';

import { AuthButtons } from './AuthButtons/AuthButtons';
import { Icons } from './Icons/Icons';
import { UserMenu } from './UserMenu/UserMenu';

type TProps = {
  user?: User | null;
};

export const RightContent = ({ user }: TProps) => {
  return (
    <>
      <AuthModal />
      <Flex>
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu />
      </Flex>
    </>
  );
};
