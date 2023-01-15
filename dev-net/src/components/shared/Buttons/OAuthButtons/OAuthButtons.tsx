import { Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';

type Props = {};

export const OAuthButtons = (props: Props) => {
  return (
    <Flex
      direction='column'
      width='100%'>
      <Button
        variant='oauth'
        mb={2}>
        <Image
          alt='Google'
          src='/google.png'
          height='20px'
          mr={4}
        />
        Continue with Google
      </Button>
      <Button variant='oauth'>Some another provider</Button>
    </Flex>
  );
};
