import { IconType } from 'react-icons';
import { AiOutlineHome } from 'react-icons/ai';
import { atom } from 'recoil';

export type DirectoryMenuItem = {
  communityName: string;
  link: string;
  icon: IconType;
  iconColor: string;
  communityImageURL?: string;
};

interface DirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: DirectoryMenuItem;
}

export const defaultMenuItem: DirectoryMenuItem = {
  communityName: 'Home',
  icon: AiOutlineHome,
  iconColor: 'black',
  link: '/',
};

export const defaultMenuState: DirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem,
};

export const directoryMenuState = atom<DirectoryMenuState>({
  key: 'directoryMenuState',
  default: defaultMenuState,
});
