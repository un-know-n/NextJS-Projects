import { authModalState } from '@/atoms/authModal.atom';
import { auth } from '@/firebase/firebase.config';
import { Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GiCheckedShield } from 'react-icons/gi';
import { useSetRecoilState } from 'recoil';

type TProps = {};

export const Premium: FC<TProps> = () => {
  const setModalState = useSetRecoilState(authModalState);
  const [user] = useAuthState(auth);

  const handleBuyPremium = () => {
    if (!user) setModalState({ open: true, view: 'login' });
    try {
      // TODO: Stripe logic to buy premium
    } catch (error) {
      console.log('handleBuyPremium error', error);
    }
  };

  return (
    <Flex
      direction='column'
      bg='white'
      borderRadius={4}
      p='12px'
      border='1px solid'
      borderColor='gray.300'>
      <Flex mb={2}>
        <Icon
          as={GiCheckedShield}
          fontSize={26}
          color='brand.100'
          mt={2}
        />
        <Stack
          spacing={1}
          fontSize='9pt'
          pl={2}>
          <Text fontWeight={600}>DevNet Premium</Text>
          <Text>The best experience, with monthly Coins</Text>
        </Stack>
      </Flex>
      <Button
        height='30px'
        bg='brand.100'
        color='white'
        variant='ghost'>
        Try Now
      </Button>
    </Flex>
  );
};
