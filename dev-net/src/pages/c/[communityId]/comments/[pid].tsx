import { communityState } from '@/atoms/communities.atom';
import { Post } from '@/atoms/posts.atom';
import { PageContent } from '@/components/layout/PageContent/PageContentLayout';
import { AboutCommunity } from '@/components/screens/Community/About/About';
import { PostItem } from '@/components/screens/Community/Posts/PostItem/PostItem';
import { auth, firestore } from '@/firebase/firebase.config';
import { usePosts } from '@/hooks/usePosts';
import { doc, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';

const PostPage = () => {
  const { postStateValue, setPostStateValue, onDeletePost, onVote } =
    usePosts();
  const { currentCommunity } = useRecoilValue(communityState);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const fetchCurrentPost = async (postId: string) => {
    try {
      // Find the document in the database
      const postDocRef = doc(firestore, 'posts', postId);
      const postDocument = await getDoc(postDocRef);

      // Take it and set to local storage
      const post = {
        id: postDocument.id,
        ...postDocument.data(),
      } as Post;

      setPostStateValue((prev) => ({ ...prev, selectedPost: post }));
    } catch (error) {
      console.log('fetchCurrentPost error', error);
    }
  };

  useEffect(() => {
    if (!postStateValue.selectedPost && router.query.pid) {
      fetchCurrentPost(router.query.pid as string);
    }
  }, [postStateValue.selectedPost, router.query.pid]);

  if (!postStateValue.selectedPost) return null;

  return (
    <>
      <Head>
        <title>{postStateValue.selectedPost?.title || 'Viewing post'}</title>
      </Head>

      <PageContent>
        <>
          {postStateValue.selectedPost ? (
            <PostItem
              createdByCurrentUser={
                postStateValue.selectedPost.creatorId === user?.uid
              }
              onDeletePost={onDeletePost}
              onVote={onVote}
              userVoteValue={
                postStateValue.postVotes.find(
                  (item) => item.postId === postStateValue.selectedPost?.id,
                )?.postVote
              }
              post={postStateValue.selectedPost}
            />
          ) : null}
        </>
        <>
          {currentCommunity ? (
            <AboutCommunity communityData={currentCommunity} />
          ) : null}
        </>
      </PageContent>
    </>
  );
};

export default PostPage;
