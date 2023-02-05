import { Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { GiCheckedShield } from 'react-icons/gi';

type TProps = {};

export const Premium: FC<TProps> = () => {
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
