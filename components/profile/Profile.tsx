import { useTranslation } from "next-i18next"
import { useState } from "react"
import { useAuthValue } from "../../pages/AuthContext"
import Bubbles from "../header/Navbar/Bubbles"
import SignOut from "../header/SignOut"
import ImageProfile from "./ImageProfile"

const Profile = () => {
  const { currentUser } = useAuthValue() 
  const [clickProfile, setClickProfile] = useState(false)
  const { t } = useTranslation("header")

  return (
    <>
    {
        currentUser?.photoURL && (
          <>
          <div className="hidden lg:block">
            <div onClick={()=>setClickProfile(!clickProfile)}>
              <ImageProfile src={currentUser.photoURL}/>
            </div>
            <div className={`transition duration-500 ease-in absolute bg-DarkBlueGray w-32 h-40 flex items-center justify-center flex-col rounded-2xl z-50 right-20 ${!clickProfile ? "opacity-0 -top-44 ": " top-28 "}`}>
              <div className=" border-2 rounded-lg p-3 cursor-pointer hover:opacity-50">
                <h2 className="text-lg">{t("profile")}</h2>
              </div>
              <SignOut />
              <Bubbles click={clickProfile}/>
            </div>
          </div>
          <div className=" lg:hidden">
            <ImageProfile src={currentUser.photoURL}/>
          </div>
          </>
        )
    }
    </>
  )
}

export default Profile