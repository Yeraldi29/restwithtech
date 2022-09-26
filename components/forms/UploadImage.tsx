import { useTranslation } from "next-i18next"
import { BiCamera } from "react-icons/bi"
import { useState } from "react"

const UploadImage = () => {
    const { t } = useTranslation("signIn_logIn")
    const [animation, setAnimation] = useState(false)

  return (
    <div className={`${animation && "animate-wiggle "} mx-auto my-8 rounded-xl p-2 bg-Lavender-Blue text-DarkBlueGray border-4 border-dashed border-DarkBlueGray cursor-pointer group`} onClick={()=>{setAnimation(true)}} onAnimationEnd={()=>{setAnimation(false)}}>
        <BiCamera className=" w-8 h-8 mx-auto group-hover:scale-125 duration-200 ease-in"/>
        <p><small>{t("CompleteProfile.upload")}</small></p>
        <input type="file" name="file" hidden/>
    </div>
  )
}

export default UploadImage