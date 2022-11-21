import { useState, useEffect } from "react"
import { Editor } from "slate"
import { useSlate } from "slate-react"

type CustomText = { text: string, bold: boolean, italic:boolean,strikethrough:boolean,underline:boolean}

const MarkButton = ({grow,format,icon, slatePlainText, space}:{grow:boolean,format:keyof Omit<CustomText, "text">,icon:JSX.Element,slatePlainText:string, space:string}) => {
    const [clickLeaf, setClickLeaf] = useState(false)
    const editor = useSlate()

    useEffect(()=>{
        if(slatePlainText === "" || space === " " || space === "Enter"){
            Editor.removeMark(editor,format)
            setClickLeaf(false)
        }
    },[slatePlainText, space])
    
  return (
    <div className={`border-2 lg:border-[3px] rounded-lg bg-BabyBlueEyes -rotate-12 even:rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-300 ease-in-out cursor-pointer lg:hover:bg-white lg:hover:border-Blue-Gray"} ${clickLeaf && " bg-BlueDarker text-BabyBlueEyes"}`}
    onMouseDown={e =>{
         e.preventDefault()
         toogleMark(editor,format)
         setClickLeaf(!clickLeaf)
    }}
    >
        {icon}
    </div>
  )
}

 const toogleMark = (editor : Editor,format:keyof Omit<CustomText, "text">) =>{
    const isActive = isMarkActive(editor,format)

    if(isActive){
        Editor.removeMark(editor,format)
    }else{
        Editor.addMark(editor, format,true)
    }

}

const isMarkActive = (editor : Editor,format:keyof Omit<CustomText, "text">) =>{
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false 
}

export default MarkButton