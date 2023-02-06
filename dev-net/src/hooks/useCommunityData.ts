import { authModalState } from '@/atoms/authModal.atom';
import { auth, firestore } from '@/firebase/firebase.config';
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  Community,
  CommunitySnippet,
  communityState,
} from '../atoms/communities.atom';

export const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetsDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`),
      );

      // Convert all snippets to acceptable format
      const snippets = snippetsDocs.docs.map((doc) => ({ ...doc.data() }));

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
        snippetsFetched: true,
      }));
    } catch (error: any) {
      console.log('getMySnippets error', error);
      setError(error.message);
    }
    setLoading(false);
  };

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean,
  ) => {
    //Check if authorized, not - show auth modal
    if (!user) {
      setAuthModalState({ open: true, view: 'login' });
      return;
    }

    if (error) setError('');

    // If user is joined -> exit of the community, else -> join to the one
    isJoined ? leaveCommunity(communityData.id) : joinCommunity(communityData);
  };

  const joinCommunity = async (communityData: Community) => {
    try {
      const batch = writeBatch(firestore);

      // Create community snippet for a user
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        photoURL: communityData.photoURL || '',
        isModerator: user?.uid === communityData.creatorId,
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id,
        ),
        newSnippet,
      );

      // Update number of members in the community(+1)
      batch.update(doc(firestore, `communities`, communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      // Update local recoil state of user snippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log('joinCommunity error', error);
      setError(error.message);
    }
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);

      // Remove the community from user's snippets
      const communityDocRef = doc(
        firestore,
        `users/${user?.uid}/communitySnippets`,
        communityId,
      );

      batch.delete(communityDocRef);

      // Update number of members in the community(-1)

      batch.update(doc(firestore, `communities`, communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      // Update local recoil state of user snippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (snippet) => snippet.communityId !== communityId,
        ),
      }));
    } catch (error: any) {
      console.log('leaveCommunity error', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
        snippetsFetched: false,
      }));
      return;
    }
    getMySnippets();
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loadingCommunity: loading,
  };
};
