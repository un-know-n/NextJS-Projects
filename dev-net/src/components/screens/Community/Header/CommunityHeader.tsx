import { Community } from '@/atoms/communities.atom';
import { useCommunityData } from '@/hooks/useCommunityData';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React, { FC, useMemo } from 'react';
import { MdOutlineCodeOff } from 'react-icons/md';

type TProps = {
  communityData: Community;
};

export const CommunityHeader: FC<TProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loadingCommunity } =
    useCommunityData();

  const isJoined =
    communityStateValue.mySnippets.filter(
      (community) => community.communityId === communityData.id,
    ).length > 0;

  return (
    <Flex
      direction='column'
      width='100%'
      height='146px'>
      <Box
        height='50%'
        bg='brand.200'
      />
      <Flex
        justify='center'
        bg='white'
        flexGrow={1}>
        <Flex
          width='95%'
          maxWidth='860px'>
          {communityStateValue.currentCommunity?.photoURL ? (
            <Image
              src={communityStateValue.currentCommunity.photoURL}
              alt={communityStateValue.currentCommunity.id}
              position='relative'
              top={-3}
              boxSize='64px'
              borderRadius='full'
              fit='cover'
              border='3px solid white'
            />
          ) : (
            <Icon
              as={MdOutlineCodeOff}
              fontSize={64}
              position='relative'
              top={-3}
              bg='brand.200'
              color='gray.800'
              border='3px solid white'
              borderRadius='full'
            />
          )}
          <Flex padding='10px 16px'>
            <Flex
              direction='column'
              mr={6}>
              <Text
                fontWeight={800}
                fontSize='16pt'>
                {communityData.id}
              </Text>
              <Text
                fontWeight={600}
                fontSize='10pt'
                color='gray.900'>
                c:{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? 'outline' : 'solid'}
              height='30px'
              px={6}
              isLoading={loadingCommunity}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}>
              {isJoined ? 'Joined' : 'Join'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
