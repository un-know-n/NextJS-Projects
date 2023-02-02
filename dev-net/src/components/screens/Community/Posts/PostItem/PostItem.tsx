import { Post } from '@/atoms/posts.atom';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import error from 'next/error';
import { useRouter } from 'next/router';
import React, { FC, MouseEvent, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from 'react-icons/io5';

type TProps = {
  post: Post;
  createdByCurrentUser: boolean;
  userVoteValue?: number;
  onVote: (post: Post, vote: number, communityId: string) => {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
};

dayjs.extend(relativeTime);

export const PostItem: FC<TProps> = ({
  post,
  createdByCurrentUser,
  onDeletePost,
  onSelectPost,
  onVote,
  userVoteValue,
}) => {
  const router = useRouter();
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [postError, setPostError] = useState(false);
  const singlePostPage = !onSelectPost;

  const handleDelete = async (event: MouseEvent) => {
    event.stopPropagation();

    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
      if (!success) throw new Error('Failed to delete post');
    } catch (error) {
      console.log('handleDeletePost error', error);
      setPostError(true);
    }
    setLoadingDelete(false);

    if (singlePostPage) router.push(`/c/${post.communityId}`);
  };

  const stopPropagationOnClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Flex
      border='1px solid'
      bg='white'
      borderColor={singlePostPage ? 'white' : 'gray.300'}
      borderRadius={singlePostPage ? '4px 4px 0px 0px' : 4}
      mt={singlePostPage ? 0 : 4}
      _hover={{ borderColor: singlePostPage ? 'none' : 'gray.500' }}
      cursor={singlePostPage ? 'unset' : 'pointer'}
      onClick={() => onSelectPost && onSelectPost(post)}>
      <Flex
        direction='column'
        align='center'
        bg={singlePostPage ? 'none' : 'gray.100'}
        p={singlePostPage ? '10px 0px 10px 10px' : 2}
        width='40px'
        borderRadius={singlePostPage ? 0 : '4px 0px 0px 4px'}
        onClick={stopPropagationOnClick}>
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? 'green.400' : 'gray.400'}
          cursor='pointer'
          fontSize={22}
          onClick={() => onVote(post, 1, post.communityId)}
        />
        <Text fontWeight={600}>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? 'red.400' : 'gray.400'}
          cursor='pointer'
          fontSize={22}
          onClick={() => onVote(post, -1, post.communityId)}
        />
      </Flex>
      <Flex
        direction='column'
        width='100%'>
        {postError ? (
          <Alert
            status='error'
            display='flex'
            justifyContent='space-between'
            width='100%'>
            <Flex>
              <AlertIcon />
              <AlertDescription>
                Error ocurred during post deletion!
              </AlertDescription>
            </Flex>
            <CloseButton onClick={() => setPostError((prev) => !prev)} />
          </Alert>
        ) : null}
        <Stack
          spacing={1}
          p='10px'>
          <Stack
            direction='row'
            spacing={0.6}
            align='center'
            fontSize='9pt'>
            {/* Check if on the homepage */}
            <Text>
              Posted by u:{post.creatorDisplayName}{' '}
              {dayjs(post.createdAt.seconds * 1000).fromNow()}
            </Text>
          </Stack>
          <Text
            fontSize='12pt'
            fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize='10pt'>{post.body}</Text>
          {post.imageURL ? (
            <Flex
              justify='center'
              align='center'
              p={2}>
              {loadingImage ? (
                <Skeleton
                  height='200px'
                  width='100%'
                  borderRadius={4}
                />
              ) : null}
              <Image
                src={post.imageURL}
                maxHeight='460px'
                alt='Post Image'
                display={loadingImage ? 'none' : 'unset'}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          ) : null}
        </Stack>
        <Flex
          ml={1}
          color='gray.500'>
          <Flex
            align='center'
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'>
            <Icon
              as={BsChat}
              mr={2}
            />
            <Text fontSize='9pt'>{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align='center'
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'
            onClick={stopPropagationOnClick}>
            <Icon
              as={IoArrowRedoOutline}
              mr={2}
            />
            <Text fontSize='9pt'>Share</Text>
          </Flex>
          <Flex
            align='center'
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'
            onClick={stopPropagationOnClick}>
            <Icon
              as={IoBookmarkOutline}
              mr={2}
            />
            <Text fontSize='9pt'>Save</Text>
          </Flex>
          {createdByCurrentUser ? (
            <Flex
              align='center'
              p='8px 10px'
              borderRadius={4}
              _hover={{ bg: 'gray.200' }}
              cursor='pointer'
              onClick={handleDelete}>
              {loadingDelete ? (
                <Spinner size='sm' />
              ) : (
                <>
                  <Icon
                    as={AiOutlineDelete}
                    mr={2}
                  />
                  <Text fontSize='9pt'>Delete</Text>
                </>
              )}
            </Flex>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
};
