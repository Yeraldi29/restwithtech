import { ReactElement, useState, useEffect } from 'react'
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import { NextPageWithLayout } from '../_app'
import { C_L } from '../../arrays/feedImages/C_L'

const New: NextPageWithLayout = () => {
    const router = useRouter()
    const { newPost } = router.query 

  return (
    <>
     <Head>
        <title> {newPost} </title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div>
        <p className="text-black">New {newPost}</p>
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['header','common']),
  },
})

export const getStaticPaths = async ({ locales }:{locales:Array<string>}) => {
  const paths = C_L.flatMap(item => {
    return locales.map(locale => {
      return {
        params: { newPost : item.name},
        locale: locale
      }
    }
  )})
  
  return {paths, fallback: false}
}  

New.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default New