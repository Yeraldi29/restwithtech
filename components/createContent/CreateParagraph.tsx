import { useTranslation } from "next-i18next"
import { useState, useEffect, useCallback, useMemo } from "react"
import { BiSend } from "react-icons/bi"
import { createEditor, Descendant, BaseEditor } from "slate"
import { Slate, Editable, withReact, ReactEditor, RenderLeafProps} from "slate-react"
import Toolbar from "./Toolbar"

type CustomElement = { type: 'paragraph'; children: CustomText[]}
type CustomText = { text: string, bold: boolean, italic:boolean,strikethrough:boolean,underline:boolean,code:boolean}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor 
    Element: CustomElement
    Text: CustomText
  }
}

const CreateParagraph = () => {
  const { t } = useTranslation("newPost")

  const editor = useMemo(()=> withReact(createEditor()),[])
  const [ grow, setGrow ] = useState(false)
  const [ editablecomponent, setEditableComponent] = useState<JSX.Element | null>(null)
  const [ contentSlate, setContentSlate] = useState("")
  const renderLeaf = useCallback((props: RenderLeafProps)=>{return <Leaf {...props} />  },[])

  const initialValue: Descendant[] =[
    {
    type: 'paragraph',
    children: [{ text: '',bold:false,italic:false,strikethrough:false,underline:false,code:false}],
    },
  ]
  
  useEffect(()=>{
    // I put the Editable component in an useState with an useEffect 'cause I had problems with hydratation when I reload the page
    setEditableComponent( 
      <Editable 
        renderLeaf={renderLeaf}
        spellCheck={false}
        placeholder={t("createComment.placeholder")}
      />
    )
  },[])

  // useEffect(()=>{
  // },[contentSlate])

  const handleChangeSlate = (value:Descendant[]) =>{
    const isChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if(isChange){
      const content = JSON.stringify(value)
      setContentSlate(content)
      localStorage.setItem('content',content)
    }
  }

  return (
    <>
    <div className={`w-full h-fit bg-Lavender-Blue/40 rounded-xl border-4 text-BlueDarker md:text-lg xl:text-xl border-BabyBlueEyes focus:outline-none ${grow ? "min-h-[5rem] ":"min-h-[3rem]"} transform duration-500 ease-in`}
    onClick={()=>setGrow(true)} >
      <Toolbar editor={editor} grow={grow}/>
      <div className="grid grid-cols-10 w-full relative mt-2 px-2 pb-1 sm:grid-cols-14 lg:grid-cols-16">
        <div className="w-full col-span-9 sm:col-span-13 lg:col-span-15">
          <Slate editor={editor} value={initialValue}
           onChange={handleChangeSlate} >
            {editablecomponent}
          </Slate>
        </div>
        <div className={`relative sm:col-span-1 lg:hover:opacity-50 cursor-pointer ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}>
          <BiSend className={`absolute -bottom-[0.1rem] ml-1 w-7 h-7 xl:w-9 xl:h-9 -rotate-12 text-DarkBlueGray ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`} />
        </div>
      </div>
    </div>
    </>
  )
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {

  if(leaf.bold){
    children = <strong>{children}</strong>
  }

  if(leaf.code){
    children = <code>{children}</code>
  }

  if(leaf.italic){
    children = <em>{children}</em>
  }

  if(leaf.strikethrough){
    children = <span className=" line-through">{children}</span>
  }

  if(leaf.underline){
    children = <u className=" underline">{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

export default CreateParagraph