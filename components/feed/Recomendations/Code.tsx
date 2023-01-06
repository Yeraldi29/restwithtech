import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { code } from "../../../arrays/feedImages/code"
import NewSection from "../NewSection"
import { collection, DocumentData, getDocs, orderBy, query, QuerySnapshot, where } from "firebase/firestore"
import { db } from "../../../firebase"

const Code = () => {
  const [ codeData, setCodeData ] = useState<QuerySnapshot<DocumentData> | null>(null)
  const [ loading, setLoading ] = useState(true)
  
  const { t } = useTranslation("common")
  const router = useRouter()

  useEffect(()=>{
    const handleGetData = async () => {
      setLoading(true)
      const getNews = await getDocs(await query(collection(db,"news"), orderBy("create_at","desc"), where("category", "==","code")))
      setCodeData(getNews)
      setLoading(false)
    }
    
    handleGetData()
  },[])

  return (
    <div>
      {router.asPath !== "/" ? (
        <NewSection fakeData={code} data={codeData} title={t("categories.code")} message={t("message.code")} presentationImage={"/Feed/code/adi-goldstein-mDinBvq1Sfg-unsplash.jpg"} loading={loading} />
        ) : (
        <NewSection fakeData={code} data={codeData} title={t("categories.code")} loading={loading} />
      )}
    </div>
  )
}

export default Code