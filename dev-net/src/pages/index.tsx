import { defaultMenuItem } from '@/atoms/directoryMenu.atom';
import { Post, PostVote } from '@/atoms/posts.atom';
import { PageContent } from '@/components/layout/PageContent/PageContentLayout';
import { CreateCommunityPost } from '@/components/screens/Community/CreatePost/CreateCommunityPost';
import { PostItem } from '@/components/screens/Community/Posts/PostItem/PostItem';
import { PostLoader } from '@/components/screens/Community/Posts/PostLoader/PostLoader';
import { PersonalHome } from '@/components/screens/Home/PersonalHome/PersonalHome';
import { Premium } from '@/components/screens/Home/PremiumComponent/Premium';
import { TopCommunities } from '@/components/screens/Home/Recommendations/TopCommunities';
import { auth, firestore } from '@/firebase/firebase.config';
import { useCommunityData } from '@/hooks/useCommunityData';
import { useDirectory } from '@/hooks/useDirectory';
import { usePosts } from '@/hooks/usePosts';
import { Stack } from '@chakra-ui/react';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const { communityStateValue } = useCommunityData();
  const { onSelectMenuItem, directoryState } = useDirectory();

  const buildUserHomeFeed = async () => {
    setLoading(true);
    try {
      if (communityStateValue.mySnippets.length) {
        // Fetch post from user's communities, if user has ones
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId,
        );

        const postsQuery = query(
          collection(firestore, 'posts'),
          where('communityId', 'in', myCommunityIds),
          limit(10),
        );
        const postsDocs = await getDocs(postsQuery);
        const posts = postsDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set posts to local state
        setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));
      } else await buildNoUserHomeFeed();
    } catch (error) {
      console.log('buildUserHomeFeed error', error);
    }
    setLoading(false);
  };

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      // Fetch the most popular posts
      const postsQuery = query(
        collection(firestore, 'posts'),
        orderBy('voteStatus', 'desc'),
        limit(10),
      );
      const postsDocs = await getDocs(postsQuery);
      const posts = postsDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Set them into local state
      setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));
    } catch (error) {
      console.log('buildNoUserHomeFeed error', error);
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    try {
      // Check if the id's fo the posts are the same id's in user's postVotes collection
      const postsIds = postStateValue.posts.map((post) => post.id);
      const postsVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where('postId', 'in', postsIds),
      );
      const postsVotesDocs = await getDocs(postsVotesQuery);
      const postsVotes = postsVotesDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Set them to local state
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postsVotes as PostVote[],
      }));
    } catch (error) {
      console.log('getUserPostVotes error', error);
    }
  };

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
    if (user && !loadingUser && communityStateValue.snippetsFetched)
      buildUserHomeFeed();
  }, [user, loadingUser, communityStateValue.snippetsFetched]);

  useEffect(() => {
    if (user && postStateValue.posts.length) {
      getUserPostVotes();
    }
  }, [user, postStateValue.posts]);

  useEffect(() => {
    if (directoryState.selectedMenuItem.communityName !== 'Home')
      onSelectMenuItem(defaultMenuItem);
  }, [directoryState.selectedMenuItem.communityName]);

  return (
    <>
      <Head>
        <title>DevNet</title>
      </Head>
      <PageContent>
        <>
          <CreateCommunityPost />
          {loading ? (
            <PostLoader />
          ) : (
            <Stack>
              {postStateValue.posts.map((post) => (
                <PostItem
                  createdByCurrentUser={user?.uid === post.creatorId}
                  onDeletePost={onDeletePost}
                  onSelectPost={onSelectPost}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      (vote) => post.id === vote.postId,
                    )?.postVote
                  }
                  onVote={onVote}
                  post={post}
                  homePage
                  key={post.id}
                />
              ))}
            </Stack>
          )}
        </>
        <>
          <Stack spacing={4}>
            <TopCommunities />
            <Premium />
            <PersonalHome />
          </Stack>
        </>
      </PageContent>
    </>
  );
}
