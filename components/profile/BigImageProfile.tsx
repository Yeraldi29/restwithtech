import { useTranslation } from "next-i18next"
import Image from "next/image"
import { useContext } from "react" 
import { profileImage } from "../../store/store"

const BigImageProfile = ({submit}:{submit: boolean})  => {
  const profileImg = useContext(profileImage)
  const { imageProfile } = profileImg
  const { t } = useTranslation("signIn_logIn")

  return (
    <>
    <div className="relative imageProfile w-24 h-24 drop-shadow-lg shadow-lg ">
      {
        imageProfile && (
          <Image src={imageProfile} alt="image profile" fill={true} priority/>
        )
      }
    </div>
    {
        (!imageProfile && submit) && (
         <small className="rotate-1 text-red-300 mt-4">{t("CompleteProfile.error.selectImage")}</small>  
        )
      }
    </>
  )
}

export default BigImageProfile