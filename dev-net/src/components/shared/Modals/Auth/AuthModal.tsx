import { authModalState } from '@/atoms/authModal.atom';
import { auth } from '@/firebase/firebase.config';
import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

import { OAuthButtons } from '../../Buttons/OAuthButtons/OAuthButtons';
import { OAuthInputs } from '../../Inputs/OAuthInputs/OAuthInputs';
import { ResetPassword } from './ResetPassword/ResetPassword';

export const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const [user, loading, error] = useAuthState(auth);

  const toggleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: !modalState.open,
    }));
  };

  useEffect(() => {
    setModalState((prev) => ({ ...prev, open: false }));
  }, [user]);

  return (
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
            {modalState.view === 'login' || modalState.view === 'signup' ? (
              <>
                <OAuthButtons />
                <Text
                  color='gray.500'
                  fontWeight='bold'
                  my={3}>
                  OR
                </Text>
                <OAuthInputs />
              </>
            ) : (
              <ResetPassword />
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
