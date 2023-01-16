import { AuthModalState } from '@/atoms/authModal.atom';
import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import React, { FC } from 'react';
import { MdOutlineLogin } from 'react-icons/md';

type TProps = {
  setModalState: (value: AuthModalState) => void;
};

export const NoUserList: FC<TProps> = ({ setModalState }) => {
  return (
    <MenuItem
      fontSize='10pt'
      fontWeight={700}
      _hover={{ bg: 'blue.500', color: 'white' }}
      onClick={() => setModalState({ open: true, view: 'login' })}>
      <Flex alignItems='center'>
        <Icon
          fontSize={20}
          mr={2}
          as={MdOutlineLogin}
        />
        Log In / Sign Up
      </Flex>
    </MenuItem>
  );
};
