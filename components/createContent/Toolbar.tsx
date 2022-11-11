import { BiBold, BiCode, BiItalic, BiLink, BiStrikethrough, BiUnderline } from "react-icons/bi"
import { Editor } from "slate"
import MarkButton from "./MarkButton"

const Toolbar = ({editor, grow }:{editor :Editor, grow: boolean}) => {
  return (
    <div className={`flex justify-center items-center space-x-3 ${!grow ? "max-h-0 opacity-0" : "opacity-100 bg-DarkBlueGray rounded-t-lg py-3 border-b-4 border-Blue-Gray transform duration-500 ease-in mb-3"}`}>
        <MarkButton editor={editor} grow={grow} format={"bold"} icon={<BiBold className={`w-7 h-7  xl:w-9 xl:h-9 rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>} />
        <MarkButton editor={editor} grow={grow} format={"italic"} icon={<BiItalic className={`w-7 h-7 xl:w-9 xl:h-9  -rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>} />
        <MarkButton editor={editor} grow={grow} format={"strikethrough"} icon={<BiStrikethrough className={`w-7 h-7 xl:w-9 xl:h-9  rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>} />
        <MarkButton editor={editor} grow={grow} format={"underline"} icon={<BiUnderline className={`w-7 h-7 xl:w-9 xl:h-9  -rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>} />
        {/* <MarkButton editor={editor} grow={grow} format={"link"} space={space} icon={<BiLink className={`w-7 h-7 -rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>} /> */}
        <MarkButton editor={editor} grow={grow} format={"code"} icon={<BiCode className={`w-7 h-7 xl:w-9 xl:h-9  rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}/>} />
    </div>
  )
}

export default Toolbar