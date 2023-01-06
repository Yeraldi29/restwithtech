import { useState, useEffect } from "react"
import { collection, DocumentData, getDocs, orderBy, query, QuerySnapshot, where } from "firebase/firestore"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { C_L } from "../../../arrays/feedImages/C_L"
import NewSection from "../NewSection"
import { db } from "../../../firebase"

const Computers_Portables = () => {
  const [ c_pData, setC_pData ] = useState<QuerySnapshot<DocumentData> | null>(null)
  const [ loading, setLoading ] = useState(true)
  
  const { t } = useTranslation("common")
  const router = useRouter()

  useEffect(()=>{
    const handleGetData = async () => {
      setLoading(true)
      const getNews = await getDocs(await query(collection(db,"news"), orderBy("create_at","desc"), where("category", "==","C&P")))
      setC_pData(getNews)
      setLoading(false)
    }
    
    handleGetData()
  },[])

  return (
    <div>
      {router.asPath !== "/" ? (
        <NewSection fakeData={C_L} data={c_pData} title={t("categories.C&P")} message={t("message.C&P")} presentationImage={"/Feed/C_L/firos-nv-1wBmbnvv4TE-unsplash.jpg"} loading={loading} />
      ) : (
      <NewSection fakeData={C_L} data={c_pData} title={t("categories.C&P")} loading={loading} />
      )}
    </div>
  )
}

export default Computers_Portables