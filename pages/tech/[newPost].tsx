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
import { collection, DocumentData, getDocs, orderBy, query, QuerySnapshot, where } from 'firebase/firestore'
import { db } from '../../firebase'

const New: NextPageWithLayout = () => {
    const router = useRouter()
    const { newPost } = router.query 
    const [ getData, setGetData ] = useState<QuerySnapshot<DocumentData>  | null >(null)
    const [ getContentData, setGetContentData ] = useState<QuerySnapshot<DocumentData>  | null >(null)
    const [ falseData, setFalseData ] = useState<Array<newDataProps>  | null >(newData)
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
      
      const handleGetDoc = async () => {
        const falseData = await tech.filter(data => data.title === newPost)
        
        if(falseData.length === 0){
          const docData = await getDocs(query(collection(db,"news"),where("mainTitle","==",`${newPost}`)))
          const contentData = await getDocs(query(collection(db,"news",`${docData.docs[0].data().idNewPost}`,"content"),orderBy("order")))
          
          setGetData(docData)
          setGetContentData(contentData)
          setLoading(false)
        }else{
          setFalseData(falseData)
          setLoading(false)
        }
        
      }
      
      handleGetDoc() 
      
    },[])

  return (
    <>
     <Head>
        <title>{newPost}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      {!loading && (
        <>
        {getData ? (
          <NewInformation image={getData?.docs[0].data().mainImage} title={getData?.docs[0].data().mainTitle} category={getData?.docs[0].data().category} name={getData?.docs[0].data().userName} option="data" time={getData?.docs[0].data().create_at} idNewPost={getData?.docs[0].data().idNewPost}
          profession={getData?.docs[0].data().profession} descriptionProfile={getData?.docs[0].data().descriptionProfile} profileImage={getData?.docs[0].data().profileImage} skill1={getData?.docs[0].data().skill1} skill2={getData?.docs[0].data().skill2} skill3={getData?.docs[0].data().skill3} content={getContentData} />
        ):falseData &&(
          <NewInformation image={falseData[0].image} title={falseData[0].title} category={falseData[0].category} name={falseData[0].name} option="fakeData" timeFake={falseData[0].time} idNewPost={falseData[0].idNewPost} />
        )}
        </>
      )}
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['header','newPost','common'])
  }
})

export const getStaticPaths = async ({ locales }:{locales:Array<string>}) => {
  
  const paths = await (await getDocs(query(collection(db,"news"),where("category","==","tech")))).docs.flatMap(item => {
    return locales.map(locale => {
      return {
        params: { newPost : `${item.data().mainTitle}`},
        locale: locale
      }
    }
  )})
  // .concat(tech.flatMap(item => {
  //   return locales.map(locale => {
  //     return {
  //       params: { newPost : item.title },
  //       locale: locale
  //     }
  //   }
  // )}))
    return {paths, fallback: true}
} 

  New.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default New