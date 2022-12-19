import { useTranslation } from "next-i18next"
import BigImageProfile from "../profile/BigImageProfile"
import ImageProfile from "../profile/ImageProfile"
import UploadImage from "./UploadImage"

const profileImages = [
  "/profileImages/cullan-smith-BdTtvBRhOng-unsplash.jpg",
  "/profileImages/galina-nelyubova-0TBVCyICz5U-unsplash.jpg",
  "/profileImages/jessica-christian-QQ_AN0fx8gA-unsplash.jpg",
  "/profileImages/julia-blumberg-jBzL8MvRTwY-unsplash.jpg",
  "/profileImages/kellen-riggin-eonltl6KpdQ-unsplash.jpg",
  "/profileImages/pauline-loroy-U3aF7hgUSrk-unsplash.jpg",
  "/profileImages/ramon-salinero-vEE00Hx5d0Q-unsplash.jpg",
  "/profileImages/renato-ramos-puma-Yh_oxgv8m50-unsplash.jpg",
  "/profileImages/the-lucky-neko-2JcixB1Ky3I-unsplash.jpg",
  "/profileImages/thread.jpg",
  "/profileImages/trent-erwin-UgA3Xvi3SkA-unsplash.jpg",
  "/profileImages/ugo-mendes-donelli-e4FbcDByhjI-unsplash.jpg"
]

const ChooseImageProfile = ({submit,handleClick}:{submit: boolean, handleClick:()=>void}) => {
    const { t } = useTranslation("signIn_logIn")
    
  return (
    <>
     <label className="text-center">{t("CompleteProfile.chooseImage")}</label> 
     <div className="flex justify-center items-center my-6 flex-col ">
      <BigImageProfile submit={submit}/>
     </div>
     <div className="grid grid-cols-4 gap-3 mx-auto mt-4 " onClick={handleClick}>
      {profileImages.map(src => <ImageProfile key={src} src={src}/> )}
     </div>
     <UploadImage handleClick={handleClick} message={t("CompleteProfile.upload")}/>
    </>
  )
}

export default ChooseImageProfile