import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { SO } from "../../../arrays/feedImages/SO"
import NewSection from "../NewSection"
import { collection, DocumentData, getDocs, orderBy, query, QuerySnapshot, where } from "firebase/firestore"
import { db } from "../../../firebase"

const OS = () => {
  const [ osData, setOsData ] = useState<QuerySnapshot<DocumentData> | null>(null)
  const [ loading, setLoading ] = useState(false)
  
  const { t } = useTranslation("common")
  const router = useRouter()

  useEffect(()=>{
    const handleGetData = async () => {
      setLoading(true)
      const getNews = await getDocs(await query(collection(db,"news"), orderBy("create_at","desc"), where("category", "==","os")))
      setOsData(getNews)
      setLoading(false)
    }
    
    handleGetData()
  },[])

  return (
    <div>
      {router.asPath !== "/" ? (
        <NewSection fakeData={SO} data={osData} title={t("categories.os")} message={t("message.os")} presentationImage="/Feed/SO/tadas-sar-T01GZhBSyMQ-unsplash.jpg" loading={loading} />
      ) : (
        <NewSection fakeData={SO} data={osData} title={t("categories.os")} loading={loading} />
      )}

      
    </div>
  )
}

export default OS