import { useTranslation } from "next-i18next"
import { BiMessageAltX } from "react-icons/bi"

const NoComments = () => {
    const { t } = useTranslation("newPost")

  return (
    <div className="h-52 my-6 sm:mx-16 md:mx-36 lg:mx-10 lg:my-10 flex items-center space-x-1 justify-center border-4 border-gray-500 bg-Lavender-Blue/40 rounded-xl rotate-1">
        <div>
            <h1 className="text-gray-500 text-2xl -rotate-1">{t("noComment")}</h1>
            <BiMessageAltX className="w-12 h-12 xl:w-16 xl:h-16 mx-auto text-gray-500"/>
        </div>
    </div>
  )
}

export default NoComments