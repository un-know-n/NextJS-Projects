import { postState } from '@/atoms/posts.atom';
import { useRecoilState } from 'recoil';

export const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};

  const onSelectPost = () => {};
  const onDeletePost = () => {};

  return {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  };
};
