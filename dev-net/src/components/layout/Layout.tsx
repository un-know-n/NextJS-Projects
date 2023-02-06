import { auth } from '@/firebase/firebase.config';
import React, { FC, PropsWithChildren } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Loader } from '../ui/InitialLoader/Loader';
import { Header } from './Header/Header';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [_, loadingUser] = useAuthState(auth);
  return (
    <>
      {loadingUser ? (
        <Loader
          width='full'
          height='100vh'
          justify='center'
          align='center'
        />
      ) : (
        <>
          <Header />
          <main>{children}</main>
        </>
      )}
    </>
  );
};
