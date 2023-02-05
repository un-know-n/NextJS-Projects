import { directoryMenuState } from '@/atoms/directoryMenu.atom';
import { CreateCommunityModal } from '@/components/shared/Modals/CreateCommunity/CreateCommunityModal';
import { Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { BiCode } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';

type TProps = {};

export const PersonalHome: FC<TProps> = () => {
  const [open, setOpen] = useState(false);
  const setDirectoryState = useSetRecoilState(directoryMenuState);

  const onCreatePost = () => {
    setDirectoryState((prev) => ({ ...prev, isOpen: true }));
  };

  const onCreateCommunity = () => {
    setOpen(true);
  };

  return (
    <>
      <CreateCommunityModal
        isOpen={open}
        handleClose={() => setOpen(false)}
      />
      <Flex
        direction='column'
        bg='white'
        borderRadius={4}
        border='1px solid'
        borderColor='gray.300'
        position='sticky'>
        <Flex
          align='flex-end'
          color='white'
          p='6px 10px'
          bg='blue.500'
          height='34px'
          borderRadius='4px 4px 0px 0px'
          fontWeight={600}
          bgColor='brand.100'
          //bgImage="url(/images/redditPersonalHome.png)"
          //backgroundSize="cover"
        ></Flex>
        <Flex
          direction='column'
          p='12px'>
          <Flex
            align='center'
            mb={2}>
            <Icon
              as={BiCode}
              fontSize={50}
              color='brand.100'
              mr={2}
            />
            <Text fontWeight={600}>Home</Text>
          </Flex>
          <Stack spacing={3}>
            <Text fontSize='9pt'>Your personal homepage, built for you.</Text>
            <Button
              height='30px'
              onClick={onCreatePost}>
              Create Post
            </Button>
            <Button
              variant='outline'
              height='30px'
              onClick={onCreateCommunity}>
              Create Community
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
