import { useTranslation } from "next-i18next"
import ImageProfile from "../profile/ImageProfile"
import ArrowDesktop from "./ArrowDesktop"
import ArrowMobile from "./ArrowMobile"

interface PreviousInformationProfileProps{
  name: string
  option: string
  profession?: string
  profileImage?: string
  descriptionProfile?: string
  skill1?:string
  skill2?:string
  skill3?:string
}

const PreviousInformationProfile = ({name, option, profession, profileImage, descriptionProfile, skill1, skill2, skill3}:PreviousInformationProfileProps) => {
  const { t } = useTranslation("newPost")
  
  return (
    <div className="lg:col-span-2 relative">
      <ArrowMobile />
      <div className=" sm:mx-16 sm:w-auto md:mx-36 lg:sticky top-24 lg:mx-0 lg:h-fit ">
       <div className="border-4 text-BlueDarker md:text-lg border-DarkBlueGray rounded-xl w-full mt-4 p-4 xl:mt-16 xl:py-6 bg-Lavender-Blue/40 -rotate-1">
         <div className="rotate-1">
           <div className="flex items-center space-x-3">
              {option === "fakeData" ? (
                <ImageProfile src={`https://i.pravatar.cc/150?u=${name}`}/>
              ):(option === "data" && profileImage) && (
                <ImageProfile src={profileImage}/>
              )}
                {option === "fakeData" ? (
                  <h4 className=" font-semibold xl:text-xl">Lorem Ipsum</h4>
                ):option === "data" &&(
                  <h4 className=" font-semibold xl:text-xl">{name}</h4>
                )}
           </div>
            <p className="mt-2 xl:text-xl">
                {option === "fakeData" ? (
                  <span>porta litora habitasse curabitur malesuada ut potenti justo. Est justo turpis suscipit mattis dictumst aptent ultrices habitant a, potenti aliquam lectus pulvinar sem ut nullam hendrerit, id convallis erat fames lobortis euismod rutrum imperdiet.</span>
                ):option === "data" &&(
                  <span>{descriptionProfile}</span>
                )}
            </p>
            <h5 className=" font-semibold xl:text-xl text-BabyBlueEyes">{t("skills")}</h5>
            <ul className=" list-disc ml-4 text-base xl:text-lg">
              {option === "fakeData" ? (
                <>
                <li>litora habitasse</li>
                <li>ultrices</li>
                <li>vitae sem nec</li>
                </>
              ):option === "data" && (
                <>
                <li>{skill1}</li>
                <li>{skill2}</li>
                <li>{skill3}</li>
                </>
              )}
            </ul>
            <h5 className=" font-semibold xl:text-xl text-BabyBlueEyes">{t("thisUser")} 
                {option === "fakeData" ? (
                  <span className="text-base text-DarkBlueGray"> Potenti aliquam lectus</span>
                ):option === "data" && (
                  <span className="text-base text-DarkBlueGray"> {profession}</span>
                )}
            </h5>
          </div>
         </div>
        <ArrowDesktop />
      </div>
    </div>
  )
}

export default PreviousInformationProfile
