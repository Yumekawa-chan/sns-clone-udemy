import Head from 'next/head'
import React from 'react'
import Timeline from './components/Timeline'

function Home() { 
  return (
    <>
      <Head>
        <title>SNS Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Timeline />
    </>
  )
}

export default Home;