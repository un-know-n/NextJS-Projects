import { communityState } from '@/atoms/communities.atom';
import { PageContent } from '@/components/layout/PageContent/PageContentLayout';
import { AboutCommunity } from '@/components/screens/Community/About/About';
import { NewPostForm } from '@/components/screens/Community/NewPostForm/NewPostForm';
import { auth } from '@/firebase/firebase.config';
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
          {user && (
            <NewPostForm
              user={user}
              communityImageURL={currentCommunity?.photoURL}
            />
          )}
        </>
        <>
          {currentCommunity ? (
            <AboutCommunity communityData={currentCommunity} />
          ) : null}
        </>
      </PageContent>
    </>
  );
};

export default SubmitPostPage;
