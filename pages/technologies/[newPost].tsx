import { ReactElement, useState, useEffect } from 'react'
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import { NextPageWithLayout } from '../_app'
import { tech } from '../../arrays/feedImages/tech'
import NewInformation from '../../components/NewInformation'
import { newData } from '../../initialProps'

const New: NextPageWithLayout = () => {
    const router = useRouter()
    const { newPost } = router.query 
    const [getData, setGetData] = useState<itemProps | undefined>(newData)

    useEffect(()=>{
      const falseData = tech.find(data => data.title === newPost )
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
         <NewInformation image={getData.image} title={getData.title} category={getData.category} alt={getData.alt} />
      ) 
      }
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['header','common']),
  },
})

export const getStaticPaths = async ({ locales }:{locales:Array<string>}) => {
  const paths = tech.flatMap(item => {
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