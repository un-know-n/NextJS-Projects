import { Community } from '@/atoms/communities.atom';
import { PageContent } from '@/components/layout/PageContent';
import { Header } from '@/components/screens/Community/Header';
import { NotFound } from '@/components/screens/Community/NotFound';
import { firestore } from '@/firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { FC } from 'react';
import safeJsonStringify from 'safe-json-stringify';

type TProps = {
  communityData: Community | '';
};

const CommunityPage: FC<TProps> = ({ communityData }) => {
  if (!communityData) return <NotFound />;

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <div>LHS</div>
        </>
        <>
          <div>RHS</div>
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
