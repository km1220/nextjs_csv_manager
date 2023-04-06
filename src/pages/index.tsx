import type { NextPage } from 'next'
import Head from 'next/head'

import MainLayout from '@/layouts/MainLayout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Index Page</title>
        <meta name="description" content="Index Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <h1 >
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </MainLayout>
    </>
  )
}

export default Home
