import { useTranslation } from "next-i18next"

const CannotSave = ({text}: {text:string}) => {
  const { t } = useTranslation("newPost")

  return <>
    <div className="border-4 border-red-500 rounded-xl mt-2 p-1 ">
      <h5 className="text-sm lg:text-base text-red-500 text-center "><strong>{t("warning")}</strong> {text}</h5>
    </div> 
  </>
  
}

export default CannotSave