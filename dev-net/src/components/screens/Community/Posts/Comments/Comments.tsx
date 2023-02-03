import { Post, postState } from '@/atoms/posts.atom';
import { firestore } from '@/firebase/firebase.config';
import { takeUserName } from '@/helpers/takeUserName';
import { Box, Flex, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { Comment, CommentItem } from './Comment/CommentItem';
import { CommentsInput } from './Input/CommentsInput';

type TProps = {
  user: User;
  selectedPost: Post;
  communityId: string;
};

export const PostComments: FC<TProps> = ({
  communityId,
  selectedPost,
  user,
}) => {
  const setPostState = useSetRecoilState(postState);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [deleteOnPost, setDeleteOnPost] = useState('');
  const [fetchLoading, setFetchLoading] = useState(false);

  const onCreateComment = async () => {
    setCommentLoading(true);
    try {
      const batch = writeBatch(firestore);
      // Create a comment document
      const commentDocRef = doc(collection(firestore, 'comments'));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayName: takeUserName(user),
        communityId: communityId,
        postId: selectedPost.id,
        postTitle: selectedPost.title,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      // Increase a number of comments in post document
      const postDocRef = doc(firestore, 'posts', selectedPost.id);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      // Update client recoil state
      setCommentText('');
      setComments((prev) => [newComment, ...prev]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error) {
      console.log('onCreateComment error', error);
    }
    setCommentLoading(false);
  };

  const onDeleteComment = async (comment: Comment) => {
    setDeleteOnPost(comment.id);
    try {
      const batch = writeBatch(firestore);
      // Delete a comment document
      const commentDocRef = doc(firestore, 'comments', comment.id);
      batch.delete(commentDocRef);

      // Decrease a number of comments in post document
      const postDocRef = doc(firestore, 'posts', selectedPost.id);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });

      await batch.commit();

      // Update client recoil state
      setComments(comments.filter((item) => item.id !== comment.id));
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));
    } catch (error) {
      console.log('onDeleteComment error', error);
    }
    setDeleteOnPost('');
  };

  const getPostComments = async () => {
    setFetchLoading(true);
    try {
      // Search for the documents in the firebase
      const commentsQuery = query(
        collection(firestore, 'comments'),
        where('postId', '==', selectedPost.id),
        orderBy('createdAt', 'desc'),
      );
      const commentsDocs = await getDocs(commentsQuery);

      // Take them and push to local storage
      const comments = commentsDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments as Comment[]);
    } catch (error) {
      console.log('getPostComments error', error);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    if (selectedPost.id) getPostComments();
  }, [selectedPost.id]);

  return (
    <Box
      bg='white'
      borderRadius='0px 0px 4px 4px'
      p={2}>
      <Flex
        direction='column'
        pl={10}
        pr={4}
        mb={6}
        fontSize='10pt'
        width='100%'>
        <CommentsInput
          createLoading={commentLoading}
          onCreateComment={onCreateComment}
          commentText={commentText}
          user={user}
          setCommentText={setCommentText}
        />
      </Flex>
      <Stack
        spacing={6}
        p={2}>
        {fetchLoading ? (
          [0, 1, 2].map((item) => (
            <Box
              key={item}
              padding='6'
              bg='white'>
              <SkeletonCircle size='10' />
              <SkeletonText
                mt='4'
                noOfLines={2}
                spacing='4'
              />
            </Box>
          ))
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                direction='column'
                justify='center'
                align='center'
                borderTop='1px solid'
                borderColor='gray.100'
                p={20}>
                <Text
                  fontWeight={700}
                  opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
            ) : (
              comments.map((comment) => (
                <CommentItem
                  comment={comment}
                  loadingDelete={deleteOnPost === comment.id}
                  onDeleteComment={onDeleteComment}
                  userId={user.uid}
                  key={comment.id}
                />
              ))
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
