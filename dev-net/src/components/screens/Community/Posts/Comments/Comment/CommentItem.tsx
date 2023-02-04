import { Box, Flex, Icon, Spinner, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import React, { FC } from 'react';
import { AiOutlineCode } from 'react-icons/ai';
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from 'react-icons/io5';

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayName: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

type TProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId?: string;
};

export const CommentItem: FC<TProps> = ({
  comment,
  loadingDelete,
  onDeleteComment,
  userId,
}) => {
  return (
    <Flex>
      <Box mr={2}>
        <Icon
          as={AiOutlineCode}
          fontSize={45}
          color='gray.600'
        />
      </Box>
      <Stack spacing={1}>
        <Stack
          direction='row'
          align='center'
          fontSize='10pt'>
          <Text fontWeight={700}>{comment.creatorDisplayName}</Text>
          <Text color='gray.600'>
            {dayjs(comment.createdAt.seconds * 1000).fromNow()}
          </Text>
          {loadingDelete && <Spinner size='sm' />}
        </Stack>
        <Text fontSize='10pt'>{comment.text}</Text>
        <Stack
          direction='row'
          align='center'
          cursor='pointer'
          color='gray.500'>
          <Icon
            as={IoArrowUpCircleOutline}
            fontSize={20}
          />
          <Icon
            as={IoArrowDownCircleOutline}
            fontSize={20}
          />
          {userId === comment.creatorId ? (
            <>
              <Text
                fontSize='10pt'
                _hover={{ color: 'brand.100' }}>
                Edit
              </Text>
              <Text
                fontSize='10pt'
                _hover={{ color: 'brand.100' }}
                onClick={() => onDeleteComment(comment)}>
                Delete
              </Text>
            </>
          ) : null}
        </Stack>
      </Stack>
    </Flex>
  );
};
