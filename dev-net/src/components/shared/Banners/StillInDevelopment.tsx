import { Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export const StillInDevelopment: FC<IProps> = ({ ...props }) => {
  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      mx='auto'
      fontWeight={500}
      {...props}>
      <Image
        src='/development.png'
        alt='Still in development image'
        width={100}
        height={100}
      />
      <Text mt={2}>Functionality is still in development</Text>
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
