import React from 'react';
import Layout from './Components/Layout/Layout'
import Hero from './Components/Hero/Hero'
import { isUser, logout } from '../utils/auth'

export default function SecurePage({ children }) {
  return (
    <div>
    <Layout>
      {children}
    </Layout>
    </div>
  );
}

// getServerSideProps runs on every request
export async function getServerSideProps(context) {
  // check authentication status
  const loggedIn = isUser // some logic to determine if user is logged in

  // if not logged in, redirect to login page
  if (!loggedIn) {
    return {
      redirect: {
        destination: '/login', // login page url
        permanent: false,
      },
    };
  }

  // otherwise, return props as usual
  return {
    props: {}, // will be passed to the page component as props
  };
}