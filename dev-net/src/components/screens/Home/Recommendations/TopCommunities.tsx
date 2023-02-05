import { Community } from '@/atoms/communities.atom';
import { firestore } from '@/firebase/firebase.config';
import { useCommunityData } from '@/hooks/useCommunityData';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from '@chakra-ui/react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { MdOutlineCodeOff } from 'react-icons/md';

type TProps = {};

export const TopCommunities: FC<TProps> = ({}) => {
  const [topCommunities, setTopCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunitiesRecommendations = async () => {
    setLoading(true);
    try {
      // Query all communities with highest number of members
      const topCommunitiesQuery = query(
        collection(firestore, 'communities'),
        orderBy('numberOfMembers'),
        limit(5),
      );
      const topCommunitiesDocs = await getDocs(topCommunitiesQuery);
      const topComms = topCommunitiesDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Set to local state
      setTopCommunities(topComms as Community[]);
    } catch (error) {
      console.log('getCommunitiesRecommendations error', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunitiesRecommendations();
  }, []);

  return (
    <>
      <Flex
        direction='column'
        bg='white'
        borderRadius={4}
        border='1px solid'
        borderColor='gray.300'>
        <Flex
          align='flex-end'
          color='white'
          p='6px 12px'
          height='70px'
          borderRadius='4px 4px 0px 0px'
          fontWeight={700}
          //bgImage='url()'
          bgColor='brand.100'
          bgGradient='linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75))'>
          Top Communities
        </Flex>
        <Flex direction='column'>
          {loading ? (
            <Stack
              mt={2}
              p={3}>
              <Flex
                justify='space-between'
                align='center'>
                <SkeletonCircle size='10' />
                <Skeleton
                  height='10px'
                  width='70%'
                />
              </Flex>
              <Flex
                justify='space-between'
                align='center'>
                <SkeletonCircle size='10' />
                <Skeleton
                  height='10px'
                  width='70%'
                />
              </Flex>
              <Flex
                justify='space-between'
                align='center'>
                <SkeletonCircle size='10' />
                <Skeleton
                  height='10px'
                  width='70%'
                />
              </Flex>
            </Stack>
          ) : (
            <>
              {topCommunities.map((community, index) => {
                const isJoined = !!communityStateValue.mySnippets.find(
                  (snippet) => snippet.communityId === community.id,
                );
                return (
                  <Flex
                    key={community.id}
                    position='relative'
                    align='center'
                    fontSize='10pt'
                    borderBottom='1px solid'
                    borderColor='gray.200'
                    p='10px 12px'>
                    <Flex
                      width='80%'
                      align='center'>
                      <Flex width='15%'>
                        <Text>{index + 1}</Text>
                      </Flex>
                      <Flex
                        align='center'
                        width='80%'>
                        {community.photoURL ? (
                          <Image
                            src={community.photoURL}
                            alt='Community image'
                            borderRadius='full'
                            boxSize='28px'
                            mr={2}
                          />
                        ) : (
                          <Icon
                            as={MdOutlineCodeOff}
                            fontSize={30}
                            color='brand.100'
                            mr={2}
                          />
                        )}
                        <Link
                          href={`/c/${community.id}`}
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontWeight: 600,
                          }}>
                          {`c:${community.id}`}
                        </Link>
                      </Flex>
                    </Flex>
                    <Box
                      position='absolute'
                      right='10px'>
                      <Button
                        height='22px'
                        fontSize='8pt'
                        variant={isJoined ? 'outline' : 'solid'}
                        onClick={() =>
                          onJoinOrLeaveCommunity(community, isJoined)
                        }>
                        {isJoined ? 'Joined' : 'Join'}
                      </Button>
                    </Box>
                  </Flex>
                );
              })}
            </>
          )}
        </Flex>

        <Box
          p='10px 20px'
          padding='6px 12px'
          borderRadius='0px 0px 4px 4px'>
          <Button
            variant='outline'
            height='30px'
            width='100%'>
            View All
          </Button>
        </Box>
      </Flex>
    </>
  );
};
