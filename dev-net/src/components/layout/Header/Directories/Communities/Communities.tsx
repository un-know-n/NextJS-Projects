import { communityState } from '@/atoms/communities.atom';
import { CreateCommunityModal } from '@/components/shared/Modals/CreateCommunity/CreateCommunityModal';
import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { MdOutlineCodeOff } from 'react-icons/md';
import { useRecoilValue } from 'recoil';

import { CommunityItem } from './CommunityItem/CommunityItem';

type Props = {};

export const Communities = (props: Props) => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;

  return (
    <>
      <CreateCommunityModal
        isOpen={open}
        handleClose={() => setOpen(false)}
      />
      <Box
        mt={3}
        mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize='7pt'
          fontWeight={500}
          color='gray.500'
          textTransform='uppercase'>
          Moderating
        </Text>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <CommunityItem
              communityName={snippet.communityId}
              icon={MdOutlineCodeOff}
              iconColor='brand.200'
              link={`/c/${snippet.communityId}`}
              communityImageURL={snippet.photoURL}
              key={snippet.communityId}
            />
          ))}
      </Box>
      <Box
        mt={3}
        mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize='7pt'
          fontWeight={500}
          color='gray.500'
          textTransform='uppercase'>
          My communities
        </Text>
        <MenuItem
          width='100%'
          fontSize='10pt'
          _hover={{ bg: 'gray.100' }}
          onClick={() => setOpen(true)}>
          <Flex>
            <Icon
              fontSize={20}
              mr={2}
              as={GrAdd}
            />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <CommunityItem
            communityName={snippet.communityId}
            icon={MdOutlineCodeOff}
            iconColor='brand.200'
            link={`/c/${snippet.communityId}`}
            communityImageURL={snippet.photoURL}
            key={snippet.communityId}
          />
        ))}
      </Box>
    </>
  );
};
