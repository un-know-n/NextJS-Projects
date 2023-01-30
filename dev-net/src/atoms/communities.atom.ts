import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: 'public' | 'restricted' | 'private';
  createdAt?: Timestamp;
  photoURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  photoURL?: string;
}

export interface CommunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity?: Community;
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
  currentCommunity: undefined,
};

export const communityState = atom<CommunityState>({
  key: 'communityState',
  default: defaultCommunityState,
});
