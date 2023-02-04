import { communityState } from '@/atoms/communities.atom';
import {
  defaultMenuItem,
  DirectoryMenuItem,
  directoryMenuState,
} from '@/atoms/directoryMenu.atom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MdOutlineCodeOff } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const { currentCommunity } = useRecoilValue(communityState);
  const router = useRouter();

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    if (menuItem.communityName === defaultMenuItem.communityName) {
      router.push(menuItem.link);
      return;
    }
    router.push(`/c/${menuItem.communityName}`);

    if (directoryState.isOpen) toggleMenu();
  };

  const toggleMenu = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  useEffect(() => {
    if (currentCommunity)
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          communityName: currentCommunity.id,
          link: `/c/${currentCommunity.id}`,
          communityImageURL: currentCommunity.photoURL,
          icon: MdOutlineCodeOff,
          iconColor: 'brand.200',
        },
      }));
  }, [currentCommunity]);

  return { directoryState, setDirectoryState, toggleMenu, onSelectMenuItem };
};
