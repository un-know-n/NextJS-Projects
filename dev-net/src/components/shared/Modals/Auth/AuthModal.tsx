import { authModalState } from '@/atoms/authModal.atom';
import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';

import { OAuthButtons } from '../../Buttons/OAuthButtons/OAuthButtons';
import { OAuthInputs } from '../../Inputs/OAuthInputs/OAuthInputs';

export const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const toggleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: !modalState.open,
    }));
  };

  return (
    <>
      <Modal
        isOpen={modalState.open}
        onClose={toggleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalState.view === 'login' && 'Log In'}
            {modalState.view === 'signup' && 'Sign Up'}
            {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            pb={6}>
            <Flex
              direction='column'
              align='center'
              justify='center'
              width='70%'>
              <OAuthButtons />
              <Text
                color='gray.500'
                fontWeight='bold'
                my={3}>
                OR
              </Text>
              <OAuthInputs />
              {/* <ResetPassword/> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
