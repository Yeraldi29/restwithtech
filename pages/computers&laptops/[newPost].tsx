import { ReactElement, useState, useEffect } from 'react'
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import { NextPageWithLayout } from '../_app'
import { C_L } from '../../arrays/feedImages/C_L'
import NewInformation from '../../components/NewInformation'
import { newData } from '../../initialProps'

const New: NextPageWithLayout = () => {
    const router = useRouter()
    const { newPost } = router.query 
    const [getData, setGetData] = useState<Array<itemProps> | undefined>(newData)

    useEffect(()=>{
      const falseData = C_L.filter(data => data.title === newPost)
      setGetData(falseData)
    },[newPost])
    
    return (
      <>
       <Head>
          <title> {newPost} </title>
          <link rel="icon" href="/icon.png" />
        </Head>
        {
         getData && (
           <NewInformation image={getData[0].image} title={getData[0].title} category={getData[0].category} name={getData[0].name} time={getData[0].time} idNewPost={getData[0].idNewPost}/>
        ) 
        }
      </>
    )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['header','newPost','common']),
  },
})

export const getStaticPaths = async ({ locales }:{locales:Array<string>}) => {
  const paths = C_L.flatMap(item => {
    return locales.map(locale => {
      return {
        params: { newPost : item.title},
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