import { useTranslation } from "next-i18next"

const CannotSave = () => {
  const { t } = useTranslation("newPost")

  return (
    <div className=" w-full h-full flex items-center justify-center rounded-lg -rotate-1 mt-4 p-4 bg-red-500  border-4 border-Blue-Gray">
        <h1 className=" text-2xl  rotate-1 text-center">
            {t("cannotSave")} 
        </h1>
    </div>
  )
}

export default CannotSave