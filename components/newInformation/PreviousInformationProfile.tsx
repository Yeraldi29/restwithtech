import { useTranslation } from "next-i18next"
import ImageProfile from "../profile/ImageProfile"
import ArrowDesktop from "./ArrowDesktop"
import ArrowMobile from "./ArrowMobile"

const PreviousInformationProfile = ({name}:{name:string}) => {
  const { t } = useTranslation("newPost")
  
  return (
    <div className="lg:col-span-2 relative">
      <ArrowMobile />
      <div className=" sm:mx-16 sm:w-auto md:mx-36 lg:sticky top-24 lg:mx-0 lg:h-fit ">
       <div className="border-4 text-BlueDarker md:text-lg border-DarkBlueGray rounded-xl w-full mt-4 p-4 xl:mt-16 xl:py-6 bg-Lavender-Blue/40 -rotate-1">
         <div className="rotate-1">
           <div className="flex items-center space-x-3">
             <ImageProfile src={`https://i.pravatar.cc/150?u=${name}`}/>
             <h4 className=" font-semibold xl:text-xl">Lorem Ipsum</h4>
           </div>
           <p className="mt-2 xl:text-lg">
            porta litora habitasse curabitur malesuada ut potenti justo. Est justo turpis suscipit mattis dictumst aptent ultrices habitant a, potenti aliquam lectus pulvinar sem ut nullam hendrerit, id convallis erat fames lobortis euismod rutrum imperdiet.
            </p>
            <h5 className=" font-semibold xl:text-xl text-BabyBlueEyes">{t("skills")}</h5>
            <ul className=" list-disc ml-4 text-base">
              <li>litora habitasse</li>
              <li>ultrices</li>
              <li>vitae sem nec</li>
            </ul>
            <h5 className=" font-semibold xl:text-xl text-BabyBlueEyes">{t("thisUser")} <span className="text-base text-DarkBlueGray"> Potenti aliquam lectus</span> </h5>
          </div>
         </div>
        <ArrowDesktop />
      </div>
    </div>
  )
}

export default PreviousInformationProfile
