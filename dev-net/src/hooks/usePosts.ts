import { authModalState } from '@/atoms/authModal.atom';
import { Community, communityState } from '@/atoms/communities.atom';
import { Post, postState, PostVote } from '@/atoms/posts.atom';
import { auth, firestore, storage } from '@/firebase/firebase.config';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const usePosts = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const setModalState = useSetRecoilState(authModalState);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async (post: Post, vote: number, communityId: string) => {
    // Check if user is authorized, if not => open the auth modal
    if (!user) {
      setModalState({ open: true, view: 'login' });
      return;
    }

    try {
      const { voteStatus } = post;
      const existingVote = postStateValue.postVotes.find(
        (vote) => vote.postId === post.id,
      );

      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];
      let voteChange = vote;

      // If the vote is new on current post
      if (!existingVote) {
        // Create reference to a new postVote document
        const postVoteDocRef = doc(
          collection(firestore, 'users', `${user?.uid}/postVotes`),
        );

        // create a new postVote document
        const newVote: PostVote = {
          id: postVoteDocRef.id,
          communityId: communityId,
          postId: post.id,
          postVote: vote, // 1 or -1
        };

        // Set operation of creating new postVote doc
        batch.set(postVoteDocRef, newVote);

        // add/subtract 1 to/from post.voteStatus
        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      }
      // Existing vote on the post
      else {
        // Removing vote from the post

        // Create reference to the existing postVote document
        const postVoteDocRef = doc(
          firestore,
          'users',
          `${user?.uid}/postVotes/${existingVote.id}`,
        );

        if (existingVote.postVote === vote) {
          // add/subtract 1 to/from post.voteStatus
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id,
          );

          // delete postVote document
          batch.delete(postVoteDocRef);

          // Negate the vote
          voteChange *= -1;
        }
        // Flipping the vote
        else {
          // add/subtract 2 to/from post.voteStatus
          updatedPost.voteStatus = voteStatus + 2 * vote;

          const voteIndex = postStateValue.postVotes.findIndex(
            (vote) => vote.id === existingVote.id,
          );

          updatedPostVotes[voteIndex] = {
            ...existingVote,
            postVote: vote,
          };

          // update the existing postVote document
          batch.update(postVoteDocRef, {
            postVote: vote,
          });

          // Double the vote
          voteChange = 2 * vote;
        }
      }

      // Update our post document
      const postRef = doc(firestore, 'posts', post.id);
      batch.update(postRef, {
        voteStatus: voteStatus + voteChange,
      });

      // Execute the batch operations
      await batch.commit();

      // Update local state with updated copies, created before
      const postIndex = postStateValue.posts.findIndex(
        (item) => post.id === item.id,
      );
      updatedPosts[postIndex] = updatedPost;
      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }));

      if (postStateValue.selectedPost?.id === post.id) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: updatedPost,
        }));
      }
    } catch (error) {
      console.log('onVote error', error);
    }
  };

  const onSelectPost = (post: Post) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }));
    router.push(`/c/${post.communityId}/comments/${post.id}`);
  };

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // Check if post has image, delete if exists
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      // Delete post from firebase
      const postDocRef = doc(collection(firestore, 'posts'), post.id);
      await deleteDoc(postDocRef);

      // Filter local state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      return true;
    } catch (error) {
      return false;
    }
  };

  const getCommunityPostVotes = async (communityId: string) => {
    // Make the query to sort the output data from firebase
    const postVotesQuery = query(
      collection(firestore, 'users', `${user?.uid}/postVotes`),
      where('communityId', '==', communityId),
    );

    // Take the docs and set them to local state
    const postVotesDocs = await getDocs(postVotesQuery);
    const postVotes = postVotesDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }));
  };

  const getCommunityData = async (communityId: string) => {
    try {
      // Take the community from the firebase
      const communityDocRef = doc(firestore, 'communities', communityId);
      const communityDoc = await getDoc(communityDocRef);

      // Set it all to the local state
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community,
      }));
    } catch (error) {
      console.log('getCommunityData error', error);
    }
  };

  // Set the information about current community if there is none
  useEffect(() => {
    if (!communityStateValue.currentCommunity && router.query.communityId) {
      getCommunityData(router.query.communityId as string);
    }
  }, [communityStateValue.currentCommunity, router.query.communityId]);

  // When user or currComm changes -> take the user votes
  useEffect(() => {
    if (!user || !communityStateValue.currentCommunity?.id) return;
    getCommunityPostVotes(communityStateValue.currentCommunity.id);
  }, [user, communityStateValue.currentCommunity]);

  // Clear the postVotes when logout
  useEffect(() => {
    if (!user) {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
  }, [user]);

  return {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  };
};
