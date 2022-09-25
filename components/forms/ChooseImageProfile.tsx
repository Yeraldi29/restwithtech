import { useTranslation } from "next-i18next"
import ImageProfile from "../ImageProfile"

const ChooseImageProfile = () => {
    const { t } = useTranslation("signIn_logIn")
    
  return (
    <>
     <label>{t("CompleteProfile.chooseImage")}</label> 
     <input type="file" name="file" hidden/>
     <div className="flex justify-center">
      <ImageProfile />
     </div>
    </>
  )
}

export default ChooseImageProfile