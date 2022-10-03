import { useTranslation } from "next-i18next"
import { useState } from "react"
import Bubbles from "./Navbar/Bubbles"
import UserAccount from "./Navbar/UserAccount"

const Account = () => {
    const [click, setClick] = useState(false)
    const [animation, setAnimation] = useState(false)
    const {t} = useTranslation("header")

  return (
    <>
    <div className="hidden relative lg:flex items-center text-center rounded-xl -rotate-12">
        <button className={`${animation && "animate-wiggle"} bg-Lavender-Blue p-2 rounded-xl border cursor-pointer group hover:bg-Lavender-Blue/50 hover:rotateItem focus:outline-none `} 
        onClick={()=>{
          setAnimation(true)
          setClick(!click)
          }} 
        onAnimationEnd={()=>setAnimation(false)}>
          <h2 className={`${click ? "text-red-400 ":  "text-Blue-Gray "}  text-md xl:text-lg  group-hover:text-white group-hover:font-extrabold `}>
            {t("account")}
          </h2>
        </button>
        <div className={`transition duration-500 ease-in absolute bg-DarkBlueGray w-32 h-28 flex items-center justify-center rounded-2xl z-50 right-10 ${!click ? "opacity-0 -top-44 ": " top-24 "}`}>
          <UserAccount />
          <Bubbles click={click}/>
        </div>
    </div>
    </>
  )
}

export default Account
