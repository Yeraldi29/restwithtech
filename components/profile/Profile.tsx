import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import { useAuthValue } from "../../store/AuthContext"
import { profileImage } from "../../store/store"
import { useUserProfileContent } from "../../store/UserContext"
import Bubbles from "../header/Navbar/Bubbles"
import SignOut from "../header/SignOut"
import ImageProfile from "./ImageProfile"

const Profile = () => {
  const [ imageUser, setImageUser ] = useState("")
  
  const { currentUser } = useAuthValue() 
  const [clickProfile, setClickProfile] = useState(false)
  const profileImg = useContext(profileImage)
  const { imageProfile } = profileImg
  const { changeImage } = useUserProfileContent()
  const { t } = useTranslation("header")

  useEffect(()=>{
    if( currentUser?.photoURL ){
      setImageUser(currentUser?.photoURL)
    }
  },[currentUser])

  useEffect(()=>{
    if(changeImage && imageProfile){
      setImageUser(imageProfile)
    }
  },[changeImage])

  return (
    <>
    {
        currentUser?.photoURL && (
          <>
            <div className="hidden lg:block">
              <div onClick={()=>setClickProfile(!clickProfile)}>
                <ImageProfile src={imageUser}/>
              </div>
              <div className={`transition duration-500 ease-in absolute bg-DarkBlueGray w-32 h-40 flex items-center justify-center flex-col rounded-2xl z-50 right-20 ${!clickProfile ? "opacity-0 -top-44 ": " top-28 "}`}>
                <Link href="/user">
                  <div className=" border-2 rounded-lg p-3 cursor-pointer hover:opacity-50">
                    <h2 className="text-lg">{t("profile")}</h2>
                  </div>
                </Link>
                <SignOut />
                <Bubbles click={clickProfile}/>
              </div>
            </div>
            <Link href="/user">
              <div className=" lg:hidden">
                <ImageProfile src={currentUser.photoURL}/>
              </div>
            </Link>
          </>
        )
    }
    </>
  )
}

export default Profile