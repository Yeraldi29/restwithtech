import { BiHelpCircle } from "react-icons/bi"
import { useCreateContentContext } from "../../store/CreateContentContext"
import { motion } from "framer-motion"
import { BiBold, BiItalic, BiLink, BiStrikethrough, BiUnderline } from "react-icons/bi"
import { useTranslation } from "next-i18next"

const HelpToolbar = ({grow}:{grow: boolean}) => {
    const {appear,handleAppear} = useCreateContentContext()
    const { t } = useTranslation("newPost")
    
  return (
    <>
    <div className={`absolute left-0 bg-BabyBlueEyes text-white w-60 rounded-lg ${appear ? " h-60 border-4 border-Blue-Gray top-3 sm:left-10 lg:left-24 xl:left-40" : " h-0 -left-60"} transform duration-300 ease-in`}>
      <div className={`flex flex-col justify-center ml-4  w-full h-full ${!appear && "opacity-0"} transform duration-300 ease-in`}>
        <div className="mb-2">
          <div className="flex items-center space-x-1">
            <BiBold className="w-9 h-9 xl:w-9 xl:h-9 text-BlueDarker" />
            <h3 className=" text-lg"><strong>{t("createComment.help.bold")}</strong></h3>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center space-x-1">
            <BiItalic className="w-9 h-9 xl:w-9 xl:h-9 text-BlueDarker" />
            <h3 className=" text-lg"><em>{t("createComment.help.italic")}</em></h3>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center space-x-1">
            <BiStrikethrough className="w-9 h-9 xl:w-9 xl:h-9 text-BlueDarker" />
            <h3 className=" text-lg"><span className=" line-through">{t("createComment.help.strikethrough")}</span></h3>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center space-x-1">
            <BiUnderline className="w-9 h-9 xl:w-9 xl:h-9 text-BlueDarker" />
            <h3 className=" text-lg"><u className=" underline">{t("createComment.help.underline")}</u></h3>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center space-x-1">
            <BiLink className="w-9 h-9 xl:w-9 xl:h-9 text-BlueDarker" />
            <h3 className=" text-lg text-Blue-Gray">{t("createComment.help.link")}</h3>
          </div>
        </div>
      </div>
    </div>
    <motion.div className={`border-2 lg:border-[3px] rounded-lg bg-red-500 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-300 ease-in-out cursor-pointer lg:hover:bg-white lg:hover:border-Blue-Gray"} active:bg-BlueDarker active:text-BabyBlueEyes`}
    onClick={()=>handleAppear(!appear)}
    animate={appear ? {rotate:372, backgroundColor: "rgb(209 210 249)"} : {rotate:0, backgroundColor: "rgb(239 68 68)"}}
    transition={appear ? { duration: 0.5 } :{}}
    >
      <BiHelpCircle className={`w-7 h-7 xl:w-9 xl:h-9 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>
    </motion.div>
    </>
  )
}

export default HelpToolbar