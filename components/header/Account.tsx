import { useTranslation } from "next-i18next"
import { useState } from "react"

const Account = () => {
    const [click, setClick] = useState(false)
    const {t} = useTranslation("header")
console.log(click);

  return (
    <>
    <div className="hidden lg:flex items-center text-center rounded-xl -rotate-12">
      <div>
        <button className={`${click && "animate-wiggle"} bg-Lavender-Blue p-2 rounded-xl border cursor-pointer group hover:bg-Lavender-Blue/50 hover:rotateItem`} 
        onClick={()=>setClick(true)} onAnimationEnd={()=>setClick(false)}>
          <h2 className="text-md xl:text-lg text-Blue-Gray group-hover:text-white group-hover:font-extrabold ">{t("account")}</h2>
        </button>
        {/* <div className="bg-Lavender-Blue p-1 rounded-t-xl">
        <h2 className="text-md xl:text-lg text-Blue-Gray">{t("sign-in")}</h2>  
       </div>
        <div className="bg-Blue-Gray rounded-b-xl p-1">
          <h2>{t("log-in")}</h2>
        </div> */}
      </div>
    </div>
    </>
  )
}

export default Account
