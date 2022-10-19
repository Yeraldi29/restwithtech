import type { ReactElement } from 'react'
import Head from 'next/head'
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import { NextPageWithLayout } from './_app'
import Layout from '../components/Layout'
import Feed from '../components/Feed'

const Home: NextPageWithLayout = () => {
  
  return (
    <>
      <Head>
        <title> Restwithtech </title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Feed />
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['signIn_logIn','header']),
  },
})

  Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}


export default Home