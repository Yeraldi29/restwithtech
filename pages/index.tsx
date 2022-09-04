import type { NextPage } from 'next'
import Head from 'next/head'
import {serverSideTranslations} from "next-i18next/serverSideTranslations"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Restwithtech</title>
        <link rel="icon" href="/icon.png" />
      </Head>
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common','header']),
  },
})

export default Home
