import React, { useEffect } from 'react';
import { user } from '../utils/auth'
import { useRouter } from 'next/router'


import Layout from './Components/Layout/Layout';
import LoginReg from './Components/LoginReg';
function LoginPage() {

  const router = useRouter()
  const userData = user?.currentUser?.email; // get user data somehow
  console.log(`userDate: ${userData}`)

  useEffect(() => {
    if (userData) {
      router.push('/quizzes') // redirects if there is no user
    }
  }, [userData])
  
  return <>
    <Layout>
      <LoginReg/>
    </Layout>
  </>
}

export default LoginPage