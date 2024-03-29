import { authModalState } from '@/atoms/authModal.atom';
import { auth } from '@/firebase/firebase.config';
import { useDirectory } from '@/hooks/useDirectory';
import { Flex, Icon, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineCode } from 'react-icons/ai';
import { BsLink45Deg } from 'react-icons/bs';
import { IoImageOutline } from 'react-icons/io5';
import { useSetRecoilState } from 'recoil';

export const CreateCommunityPost: FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const { toggleMenu } = useDirectory();

  const handleCreatePost = () => {
    if (!user) {
      setAuthModalState({ open: true, view: 'login' });
      return;
    }

    const { communityId } = router.query;

    if (!communityId) {
      toggleMenu();
      return;
    }
    router.push(`/c/${communityId}/submit`);
  };

  return (
    <Flex
      justify='space-evenly'
      align='center'
      bg='white'
      height='56px'
      borderRadius={4}
      border='1px solid'
      borderColor='gray.300'
      p={2}>
      <Icon
        as={AiOutlineCode}
        fontSize={36}
        color='gray.300'
        mr={4}
      />
      <Input
        placeholder='Create Post'
        fontSize='10pt'
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'brand.100',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg='gray.50'
        borderColor='gray.200'
        height='36px'
        borderRadius={4}
        mr={4}
        onClick={handleCreatePost}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color='gray.400'
        cursor='pointer'
      />
      <Icon
        as={BsLink45Deg}
        fontSize={24}
        color='gray.400'
        cursor='pointer'
      />
    </Flex>
  );
};
