import { collection, DocumentData, getDocs, orderBy, query, QuerySnapshot } from "firebase/firestore"
import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react"
import { mostRecents } from "../../arrays/feedImages/allCategories"
import { db } from "../../firebase"
import NewSection from "./NewSection"

const Recomendations = () => {
  const [ recentData, setData ] = useState<QuerySnapshot<DocumentData> | null>(null)
  const [ loading, setLoading ] = useState(false)
  
  const { t } = useTranslation("common")

  useEffect(()=>{
    const handleGetData = async () => {
      setLoading(true)
      const getNews = await getDocs(await query(collection(db,"news"),orderBy("create_at","desc")))
      setData(getNews)
      setLoading(false)
    }
    
    handleGetData()
  },[])

  return (
    <NewSection fakeData={mostRecents} data={recentData} title={t("recent")} message={t("message.home")} presentationImage="/Feed/matheus-ferrero-HQD4IQMqdp8-unsplash.jpg" loading={loading} />
  )
}

export default Recomendations