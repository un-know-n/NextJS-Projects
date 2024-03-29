import { Box, Skeleton, SkeletonText, Stack } from '@chakra-ui/react';
import React, { FC } from 'react';

type TProps = {};

export const PostLoader: FC<TProps> = ({}) => {
  return (
    <Stack
      spacing={6}
      mt={4}>
      <Box
        padding='10px 10px'
        boxShadow='lg'
        bg='white'
        borderRadius={4}>
        <SkeletonText
          mt='4'
          noOfLines={1}
          width='40%'
          spacing='4'
        />
        <SkeletonText
          mt='4'
          noOfLines={4}
          spacing='4'
        />
        <Skeleton
          mt='4'
          height='200px'
        />
      </Box>
      <Box
        padding='10px 10px'
        boxShadow='lg'
        bg='white'
        borderRadius={4}>
        <SkeletonText
          mt='4'
          noOfLines={1}
          width='40%'
          spacing='4'
        />
        <SkeletonText
          mt='4'
          noOfLines={4}
          spacing='4'
        />
        <Skeleton
          mt='4'
          height='200px'
        />
      </Box>
    </Stack>
  );
};
