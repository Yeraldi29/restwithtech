import { ReactElement, useState, useEffect } from 'react'
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import { NextPageWithLayout } from '../_app'
import { tech } from '../../arrays/feedImages/tech'
import NewInformation from '../../components/NewInformation'
import { newData } from '../../initialProps'
import { newDataProps } from '../../types'
import { collection, getDocs, orderBy, query, where, QuerySnapshot, DocumentData } from 'firebase/firestore'
import { db } from '../../firebase'
import { GetStaticProps } from 'next'
import { UserConfig } from 'next-i18next'

const New: NextPageWithLayout = () => {
    const router = useRouter()
    const { newPost } = router.query 
    const [getData, setGetData] = useState<Array<newDataProps> | undefined>(newData)

    // useEffect(()=>{
    //   const falseData = tech.filter(data => data.title === newPost)
    //   setGetData(falseData)
    // },[newPost])
    
  return (
    <>
     <Head>
        <title>{newPost}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      {/* {
       getData && (
         <NewInformation image={getData[0].image} title={getData[0].title} category={getData[0].category} name={getData[0].name} option="fakeData" timeFake={getData[0].time} idNewPost={getData[0].idNewPost}/>
      ) 
      } */}
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => {
  return {props: {
    ...await serverSideTranslations(locale, ['header','newPost','common'])
  }}
}

export const getStaticPaths = async ({ locales }:{locales:Array<string>}) => {
  const getNewsTech = (await getDocs(await query(collection(db,"news"), where("category", "==","tech"))))

  const paths = getNewsTech.docs.map(data => ({
    params: { newPost : data.data().mainTitle}
  }))
  // locales.map(locale => {
    // return {
      // locale: locale
    // }
  // }
  // )
    return {paths, fallback: true}
} 

  New.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default New