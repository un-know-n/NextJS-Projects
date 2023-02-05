import { Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

type TProps = {};

export const CommunityNotFound: FC = () => {
  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      minHeight='60vh'
      fontWeight={400}>
      <Image
        src='/404.png'
        alt='404 image'
        width={400}
        height={400}
      />
      Sorry, that community does not exist or has been banned
      <Link href='/'>
        <Button
          mt={4}
          textTransform='uppercase'>
          Go Home
        </Button>
      </Link>
    </Flex>
  );
};
