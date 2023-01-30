import { Community } from '@/atoms/communities.atom';
import { Box, Button, Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';

type TProps = {
  communityData: Community;
};

export const AboutCommunity: FC<TProps> = ({
  communityData: { numberOfMembers, createdAt },
}) => {
  const { query } = useRouter();

  return (
    <Box
      position='sticky'
      top='14px'>
      <Flex
        justify='space-between'
        align='center'
        bg='brand.100'
        color='white'
        p={3}
        borderRadius='4px 4px 0px 0px'>
        <Text
          fontSize='10pt'
          fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex
        direction='column'
        p={3}
        bg='white'
        borderRadius='0px 0px 4px 4px'>
        <Stack>
          <Flex
            width='100%'
            p={2}
            fontSize='10pt'
            fontWeight={700}>
            <Flex
              direction='column'
              flexGrow={1}>
              <Text>{numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex
              direction='column'
              flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          {createdAt ? (
            <Flex
              align='center'
              width='100%'
              p={1}
              fontWeight={500}
              fontSize='10pt'>
              <Icon
                as={RiCakeLine}
                fontSize={18}
                mr={2}
              />
              <Text>
                Created at{' '}
                {dayjs(createdAt.seconds * 1000).format('MMM DD, YYYY')}
              </Text>
            </Flex>
          ) : null}
          <Link href={`/c/${query.communityId}/submit`}>
            <Button
              mt={3}
              height='30px'
              width='100%'
              variant='outline'>
              Create post
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};
