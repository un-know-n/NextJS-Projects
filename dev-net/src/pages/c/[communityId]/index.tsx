import { Community, communityState } from '@/atoms/communities.atom';
import { PageContent } from '@/components/layout/PageContent/PageContentLayout';
import { AboutCommunity } from '@/components/screens/Community/About/About';
import { CreateCommunityPost } from '@/components/screens/Community/CreatePost/CreateCommunityPost';
import { CommunityHeader } from '@/components/screens/Community/Header/CommunityHeader';
import { CommunityNotFound } from '@/components/screens/Community/NotFound/CommunityNotFound';
import { Posts } from '@/components/screens/Community/Posts/Posts';
import { firestore } from '@/firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React, { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import safeJsonStringify from 'safe-json-stringify';

type TProps = {
  communityData: Community | '';
};

const CommunityPage: FC<TProps> = ({ communityData }) => {
  const setCurrentCommunity = useSetRecoilState(communityState);

  useEffect(() => {
    if (communityData)
      setCurrentCommunity((prev) => ({
        ...prev,
        currentCommunity: communityData,
      }));
  }, []);

  if (!communityData) return <CommunityNotFound />;

  return (
    <>
      <Head>
        <title>{communityData.id}</title>
      </Head>
      <CommunityHeader communityData={communityData} />
      <PageContent>
        <>
          <CreateCommunityPost />
          <Posts communityData={communityData} />
        </>
        <>
          <AboutCommunity communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.communityId as string,
    );

    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
              }),
            )
          : '',
      },
    };
  } catch (error) {
    // Custom page can be added here in future
    console.log('getServerSideProps community error', error);
  }
}

export default CommunityPage;
