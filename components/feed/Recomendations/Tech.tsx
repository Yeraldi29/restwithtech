import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import NewSection from "../NewSection"
import { tech } from "../../../arrays/feedImages/tech"
import { useRouter } from "next/router"
import { collection, DocumentData, getDocs, orderBy, query, QuerySnapshot, where } from "firebase/firestore"
import { db } from "../../../firebase"

const Tech = () => {
  const [ techData, setTechData ] = useState<QuerySnapshot<DocumentData> | null>(null)
  const [ loading, setLoading ] = useState(true)
  
  const { t } = useTranslation("common")
  const router = useRouter()

  useEffect(()=>{
    const handleGetData = async () => {
      setLoading(true)
      const getNews = await getDocs(await query(collection(db,"news"), orderBy("create_at","desc"), where("category", "==","tech")))
      setTechData(getNews)
      setLoading(false)
    }
    
    handleGetData()
  },[])

  return (
    <div>
      {router.asPath !== "/" ? (
      <NewSection fakeData={tech} data={techData} title={t("categories.tech")} message={t("message.tech")} presentationImage="/Feed/technoligies/alex-knight-2EJCSULRwC8-unsplash.jpg" loading={loading} />
      ) : (
      <NewSection fakeData={tech} data={techData} title={t("categories.tech")} loading={loading} />
      )}
    </div>
  )
}

export default Tech