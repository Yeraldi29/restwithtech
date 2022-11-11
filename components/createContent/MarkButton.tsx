import { useState, useEffect } from "react"
import { Editor } from "slate"

type CustomText = { text: string, bold: boolean, italic:boolean,strikethrough:boolean,underline:boolean,code:boolean}

const MarkButton = ({editor,grow,format,icon}:{editor:Editor,grow:boolean,format:keyof Omit<CustomText, "text">,icon:JSX.Element}) => {
    const [clickLeaf, setClickLeaf] = useState(false)

    // useEffect(()=>{
    //     if(){
    //         Editor.removeMark(editor,format)
    //         setClickLeaf(false)
    //     }
    // },[])
    
  return (
    <div className={`border-2 rounded-lg bg-BabyBlueEyes -rotate-12 even:rotate-12 ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-300 ease-in-out cursor-pointer lg:hover:opacity-50"} ${clickLeaf && " bg-BlueDarker text-BabyBlueEyes"}`}
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