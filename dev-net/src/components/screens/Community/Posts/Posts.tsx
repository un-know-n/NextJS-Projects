import { Community } from '@/atoms/communities.atom';
import { Post } from '@/atoms/posts.atom';
import { auth, firestore } from '@/firebase/firebase.config';
import { usePosts } from '@/hooks/usePosts';
import { Stack } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { PostItem } from './PostItem/PostItem';
import { PostLoader } from './PostLoader/PostLoader';

type TProps = {
  communityData: Community;
};

export const Posts: FC<TProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();

  const getPosts = async () => {
    setLoading(true);
    try {
      // Get posts from current community
      const postsQuery = query(
        collection(firestore, 'posts'),
        where('communityId', '==', communityData.id),
        orderBy('createdAt', 'desc'),
      );
      const postsDocs = await getDocs(postsQuery);

      // Store in post state
      const posts = postsDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Your posts --->', posts);
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log('getPosts error', error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post) => (
            <PostItem
              createdByCurrentUser={user?.uid === post.creatorId}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
              onVote={onVote}
              post={post}
              key={post.id}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
