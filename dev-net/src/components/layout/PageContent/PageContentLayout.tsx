import { Flex } from '@chakra-ui/react';
import React, { FC, PropsWithChildren } from 'react';

type TProps = {};

//@ts-ignore
export const PageContent: FC<PropsWithChildren<TProps>> = ({ children }) => {
  if (!children) return;

  return (
    <Flex
      justify='center'
      p='16px 0px'>
      <Flex
        width='95%'
        justify='center'
        maxWidth='860px'>
        {/* Left side */}
        <Flex
          direction='column'
          width={{ base: '100%', md: '65%' }}
          mr={{ base: 0, md: 6 }}>
          {children[0 as keyof typeof children]}
        </Flex>

        {/* Right side */}
        <Flex
          direction='column'
          display={{ base: 'none', md: 'flex' }}
          flexGrow={1}>
          {children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
