import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { ReactElement, useEffect } from "react"
import Layout from "../../components/Layout"
import { useAuthValue } from "../../store/AuthContext"
import { NextPageWithLayout } from "../_app"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase"
import { useRouter } from "next/router"

const PostNew: NextPageWithLayout = () => {

    const { currentUser } = useAuthValue()
    const router = useRouter()

    useEffect(()=>{
        const handleurlPost = async () => {
            if(currentUser?.uid){
              const docUser = query(collection(db,"users"),where("uid","==",currentUser.uid))
              const getDocUser = await getDocs(docUser)
              
              if(getDocUser.docs[0].data().descriptionProfile === "" ){
                router.push("/user")
              }
              if(!currentUser){
                router.push("/")
              }
            }
        }
        handleurlPost()
    },[currentUser])
    
  return (
    <>
     <Head>
        <title>postNew</title>
        <link rel="icon" href="/icon.png" />
    </Head> 
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
    props: {
      ...await serverSideTranslations(locale, ['header']),
    },
})
  
PostNew.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
}

export default PostNew