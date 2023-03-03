import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
//import { user } from '../../../utils/auth';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext'

export default function SecurePage({ children }) {
  const router = useRouter();
  const { currentUser } = useAuth();
  //const userData = user?.currentUser?.email; // get user data somehow
  //console.log(`userData in SecurePage: ${currentUser}`)

  useEffect(() => {
    if (!currentUser) {
      router.push('/login') // redirects if there is no user
    }
  }, [currentUser])

  return (
    <>
      <Layout>
        {children}
      </Layout>
    </>
  );
}