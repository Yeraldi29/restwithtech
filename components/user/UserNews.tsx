import { collection, DocumentData, getDocs, QuerySnapshot } from "firebase/firestore"
import { useTranslation } from "next-i18next"
import { useState, useEffect } from "react"
import { BiSad } from "react-icons/bi"
import { db } from "../../firebase"
import { useAuthValue } from "../../store/AuthContext"

const UserNews = () => {
    const [ userNews, setUserNews ] = useState<QuerySnapshot<DocumentData> | null>(null)
    
    const { currentUser } = useAuthValue()
    const { t } = useTranslation("user")
    
    useEffect(()=>{
        const handleUserNews =async () => {
            if(currentUser?.uid){
                const docsUserNews = collection(db, "users", currentUser.uid, "userNews")
                const getDocsUserNews = await getDocs(docsUserNews)
                setUserNews(getDocsUserNews)
            }
        }
        handleUserNews()
    },[currentUser])
    
  return (
    <div className="w-full lg:flex lg:justify-center">
      {userNews?.empty && (
        <div className="h-52 my-6 p-1 text-center sm:max-w-md sm:mx-auto lg:max-w-lg lg:m-0 lg:p-2 flex flex-col items-center space-x-1 justify-center border-4 border-gray-500 bg-Lavender-Blue/40 rounded-xl rotate-1">
            <h1 className="text-gray-500 text-2xl -rotate-1">{t("noNews")}</h1>
            <BiSad className="w-14 h-14 xl:w-16 xl:h-16 mx-auto text-gray-500" />
        </div>
      )}
    </div>
  )
}

export default UserNews