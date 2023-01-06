import { collection, DocumentData, getDocs, orderBy, query, QuerySnapshot, where } from "firebase/firestore"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { mobile } from "../../../arrays/feedImages/mobile"
import { db } from "../../../firebase"
import NewSection from "../NewSection"

const Mobiles = () => {
  const [ mobileData, setMobileData ] = useState<QuerySnapshot<DocumentData> | null>(null)
  const [ loading, setLoading ] = useState(true)
  
  const { t } = useTranslation("common")
  const router = useRouter()

  useEffect(()=>{
    const handleGetData = async () => {
      setLoading(true)
      const getNews = await getDocs(await query(collection(db,"news"), orderBy("create_at","desc"), where("category", "==","mobile")))
      setMobileData(getNews)
      setLoading(false)
    }
    
    handleGetData()
  },[])

  return (
    <div>
      {router.asPath !== "/" ? (
        <NewSection fakeData={mobile} data={mobileData} title={t("categories.mobile")} message={t("message.mobile")} presentationImage={"/Feed/mobile/jonas-leupe-wK-elt11pF0-unsplash.jpg"} loading={loading} />
      ) : (
        <NewSection fakeData={mobile} data={mobileData} title={t("categories.mobile")} loading={loading} /> 
      )}
    </div>
  )
}

export default Mobiles