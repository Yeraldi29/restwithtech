import { useTranslation } from "next-i18next"
import { BiHelpCircle, BiHide, BiImageAdd, BiParagraph, BiPlus, BiShow } from "react-icons/bi"

const Helper = () => {

  const { t } = useTranslation("createNew")
    
  return (
    <div className="mt-8 border-4 border-Blue-Gray rounded-xl" >
      <div className="border-b-4 border-Blue-Gray p-1">
        <div className="flex items-center space-x-1">
            <BiPlus className="-rotate-12 w-10 h-10 flex-shrink-0" />
            <h5>{t("addContent")}</h5>
        </div>
        <div className=" ml-5 my-2 border-2 border-DarkBlueGray rounded-lg ">
            <div className="flex items-center space-x-1 border-b-2 border-DarkBlueGray p-1">
                <BiParagraph className="rotate-12 w-10 h-10 flex-shrink-0" />
                <h5>{t("addContentOptions.addParagraph")}</h5>
            </div>
            <div className="flex items-center space-x-1 p-1">
                <BiImageAdd className="-rotate-12 w-10 h-10 flex-shrink-0" />
                <h5>{t("addContentOptions.addImage")}</h5>
            </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 border-b-4 border-Blue-Gray p-1">
        <div className="flex items-center space-x-1">
          <BiShow className="rotate-12 w-10 h-10 flex-shrink-0" />
          <h5>{t("preView")}</h5>
        </div>
      </div>
      <div className="flex items-center space-x-2 border-b-4 border-Blue-Gray p-1">
        <div className="flex items-center space-x-1">
          <BiHide className="rotate-12 w-10 h-10 flex-shrink-0" />
          <h5>{t("hidePreView")}</h5>
        </div>
      </div>
      <div className="flex items-center space-x-2 p-1">
        <div className="flex items-center space-x-1">
          <BiHelpCircle className="-rotate-12 text-red-400 w-10 h-10 flex-shrink-0" />
          <h5>{t("help")}</h5>
        </div>
      </div>
    </div>
  )
}

export default Helper