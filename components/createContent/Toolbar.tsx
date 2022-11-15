import { useTranslation } from "next-i18next"
import { BiBold, BiItalic, BiLink, BiStrikethrough, BiUnderline } from "react-icons/bi"
import { useSlateStatic } from "slate-react"
import HelpToolbar from "./HelpToolbar"
import MarkButton from "./MarkButton"
import { insertLink } from "./utils/link"
import { motion } from "framer-motion"
import { useCreateContentContext } from "../../store/CreateContentContext"

const Toolbar = ({grow, slatePlainText, space }:{grow: boolean, slatePlainText: string, space: string}) => {
  const editor = useSlateStatic()
  const { t } = useTranslation("newPost")
  const { appear } = useCreateContentContext()

  const handleInsertLink = () => {
    const url = prompt(t("url"))
    if(url){
      insertLink(editor, url)
    }
  }
  
  return (
    <div className={`flex  justify-center items-center space-x-3 lg:space-x-4 overflow-hidden h-auto ${!grow ? "max-h-0 opacity-0" : "opacity-100 bg-DarkBlueGray rounded-t-lg py-3 border-b-4 border-Blue-Gray transform duration-500 ease-in mb-3"} `}>
       <motion.div className={`relative flex justify-center items-center space-x-3 py-1 px-3 lg:space-x-4 ${appear ? " h-60" : " h-0"} transform duration-300 ease-in`} 
       animate={appear ? { translateX: -500 } :{}}
       transition={appear ? { duration: 0.5 } :{}}
       >
        <MarkButton grow={grow} format={"bold"} space={space} slatePlainText={slatePlainText} icon={<BiBold className={`w-7 h-7  xl:w-9 xl:h-9 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>} />
        <MarkButton grow={grow} format={"italic"} space={space} slatePlainText={slatePlainText} icon={<BiItalic className={`w-7 h-7 xl:w-9 xl:h-9  -rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>} />
        <MarkButton grow={grow} format={"strikethrough"} space={space} slatePlainText={slatePlainText} icon={<BiStrikethrough className={`w-7 h-7 xl:w-9 xl:h-9  rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>} />
        <MarkButton grow={grow} format={"underline"} space={space} slatePlainText={slatePlainText} icon={<BiUnderline className={`w-7 h-7 xl:w-9 xl:h-9  -rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>} />
        <div className={`border-2 lg:border-[3px] rounded-lg bg-BabyBlueEyes -rotate-12 even:rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-300 ease-in-out cursor-pointer lg:hover:bg-white lg:hover:border-Blue-Gray"} active:bg-BlueDarker active:text-BabyBlueEyes`}
        onClick={handleInsertLink}>
          <BiLink className={`w-7 h-7 xl:w-9 xl:h-9 -rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>
        </div>
       </motion.div>
       <HelpToolbar grow={grow} />
    </div>
  )
}

export default Toolbar