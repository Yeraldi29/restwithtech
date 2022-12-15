import { collection, DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore"
import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { useAuthValue } from "../../store/AuthContext"
import { useUserProfileContent } from "../../store/UserContext"
import Loading from "../Loading"
import EditProfile from "./userProfile/EditProfile"
import UserHeader from "./userProfile/UserHeader"

const UserProfile = () => {
  const [ userProfile, setUserProfile ] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [ loading, setLoading ] = useState(true)
  const [ editProfile, setEditProfile ] = useState(false)

  const { currentUser } = useAuthValue()
  const { t } = useTranslation("user")
  const { done } = useUserProfileContent()

  useEffect(()=>{
    const handleDocUser = async () => {
      if(currentUser?.uid){
          setLoading(true)
          const docUser = query(collection(db,"users"),where("uid","==",currentUser.uid))
          const getDocUser = await getDocs(docUser)
          setUserProfile(getDocUser.docs[0])
          setLoading(false)
      }
    }

    handleDocUser()
 },[currentUser, done])

  return (
    <div className=" border-4 border-DarkBlueGray text-BlueDarker rounded-xl mt-4 p-2">
    <UserHeader />
    {loading ? (
      <Loading />
    ):(userProfile?.data().descriptionProfile === "" ) ? (
      <>
      <h3 className="text-red-500 text-lg text-center">{t("warningEdit")}</h3>
      <EditProfile descriptionProfile={userProfile?.data().descriptionProfile} skill1Profile={userProfile?.data().skill1} skill2Profile={userProfile?.data().skill2}
      skill3Profile={userProfile?.data().skill3} 
      professionProfile={userProfile?.data().profession} />
      </>
     ):(
      <>
       <div className="text-white bg-DarkBlueGray my-2 p-2 border-4 border-Blue-Gray rounded-xl">
         <p>{userProfile?.data().descriptionProfile}</p>
       </div>
       <div className="w-fit mx-auto my-3 p-2 bg-DarkBlueGray border-4 border-Blue-Gray rounded-xl -rotate-1 text-xl text-white"
       onClick={()=>setEditProfile(true)}>
        <h2>{t("editProfile")}</h2>
       </div>
       {editProfile && (
        <EditProfile descriptionProfile={userProfile?.data().descriptionProfile} skill1Profile={userProfile?.data().skill1} skill2Profile={userProfile?.data().skill2}
        skill3Profile={userProfile?.data().skill3} 
        professionProfile={userProfile?.data().profession} />
       )}
      </>
     )
    }
    </div>
  )
}

export default UserProfile