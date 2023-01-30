import { communityState } from '@/atoms/communities.atom';
import { PageContent } from '@/components/layout/PageContent/PageContentLayout';
import { NewPostForm } from '@/components/screens/Community/NewPostForm/NewPostForm';
import { auth } from '@/firebase/firebase.config';
import { Box, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';

type Props = {};

const SubmitPostPage = (props: Props) => {
  const [user] = useAuthState(auth);
  const { currentCommunity } = useRecoilValue(communityState);

  return (
    <>
      <Head>
        <title>Create a post</title>
      </Head>
      <PageContent>
        <>
          <Box
            p='14px 0px'
            borderBottom='1px solid'
            borderColor='white'>
            <Text>Create a post</Text>
          </Box>
          {user && <NewPostForm user={user} />}
        </>
        <>{/* <AboutCommunity communityData={currentCommunity} /> */}</>
      </PageContent>
    </>
  );
};

export default SubmitPostPage;
