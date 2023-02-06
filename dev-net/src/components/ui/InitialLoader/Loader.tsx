import { Flex, FlexProps, Spinner } from '@chakra-ui/react';
import React, { FC } from 'react';

interface IProps extends FlexProps {}

export const Loader: FC<IProps> = ({ ...props }) => {
  return (
    <Flex {...props}>
      <Spinner size='xl' />
    </Flex>
  );
};
