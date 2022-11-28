import { useTranslation } from "next-i18next"
import { useState, useEffect, useCallback } from "react"
import { BiSend } from "react-icons/bi"
import { createEditor, Descendant, BaseEditor, Node, Range, Transforms } from "slate"
import { Slate, Editable, withReact, ReactEditor, RenderLeafProps, RenderElementProps} from "slate-react"
import { withHistory, HistoryEditor } from "slate-history"
import { isKeyHotkey } from 'is-hotkey'
import Link from "./Link"
import withLinks from "./plugins/withLinks"
import Toolbar from "./Toolbar"
import useCreateComment from "../../Hooks/firebase/useCreateComment"
import { serialize } from "./plugins/serialize"
import { useSlatePlainText } from "../../store/CreateContentContext"

type LinkElement = {type: 'link', url:string, children: Descendant[] }
type CustomELement = { type: 'paragraph',children:CustomText[]}
type CustomText = { text: string, bold?: boolean, italic?:boolean,strikethrough?:boolean,underline?:boolean, code?: boolean}
type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomELement | LinkElement
    Text: CustomText
  }
}

interface createParagraphProps {
  cannotComment: boolean
  option: string
  idNewPost: string | undefined
  name: string
  parent_id: number 
}

const initialValues: Descendant[] = [
  {
  type: 'paragraph',
  children: [{ text: '',bold:false,italic:false,strikethrough:false,underline:false,code:false}],
  },
]

const CreateParagraph = ({ cannotComment, option, idNewPost, name,  parent_id }:createParagraphProps) => {
  const { t } = useTranslation("newPost")

  const [ editor ] = useState(withLinks(withHistory(withReact(createEditor()))))
  const [ grow, setGrow ] = useState(false)
  const [ space, setSpace ] = useState("")
  const [ editablecomponent, setEditableComponent] = useState<JSX.Element | null>(null)
  const {  setContentComment, handleSaveComment, saved, setSaved } = useCreateComment(idNewPost, name, parent_id)
  const renderLeaf = useCallback((props: RenderLeafProps)=>{return <Leaf {...props} />  },[])
  
  const checkout  = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('content') as string) : null
  const [ value, setValue ] = useState(checkout || initialValues)
  const { plainText ,handlePlainText, handleClickSave } = useSlatePlainText()

  const renderElement = (props: RenderElementProps) => {
    switch(props.element.type){
      case "link":
        return <Link {...props} />
      default:
        return (
          <p {...props.attributes}>{props.children}</p>
        )
    }
  }

  const onKeyDown:React.KeyboardEventHandler<HTMLInputElement> = (event)=>{
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const { nativeEvent } = event
      if (isKeyHotkey('left', nativeEvent)) {
        event.preventDefault()
        Transforms.move(editor, { unit: 'offset', reverse: true })
        return
      }
      if (isKeyHotkey('right', nativeEvent)) {
        event.preventDefault()
        Transforms.move(editor, { unit: 'offset' })
        return
      }
    }
    setSpace(event.key)
  }
  
  useEffect(()=>{
    // I put the Editable component in an useState with an useEffect 'cause I had problems with hydratation when I reload the page
    setEditableComponent( 
      <div className="w-full col-span-9 sm:col-span-13 lg:col-span-15">
        <Editable 
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck={false}
          placeholder={t("createComment.placeholder")}
          onKeyDown={onKeyDown}
          />
      </div>
    )
  },[])

  useEffect(()=>{
    if(saved === "yes"){
      Transforms.delete(editor, {
        distance: 10000,
        reverse:true
      })
      Transforms.delete(editor, {
        distance: 10000,
      })
      setSaved("no")
    }
  },[saved])

  const handleChangeSlate = (value:Descendant[]) => {
    // this code appears in Slate's documantation
    const isChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if(isChange){
      const content = JSON.stringify(value)
      localStorage.setItem('content', content)
      setValue(value)
      if(option === "comment"){
        setContentComment(value)
      }
      handlePlainText(serialize(value))
    }
  }

  const handleSendContent = () => {
    handleClickSave(true)
    if(plainText.length >= 20){
      if(option === "comment" ){
        handleSaveComment()
        handleClickSave(false)
      }
    }
  }
  
  return (
    <>
    <div className={`w-full h-fit ${saved === "wait" ? "bg-gray-400" : "bg-Lavender-Blue/40"}  rounded-xl border-4 text-BlueDarker md:text-lg xl:text-xl border-Blue-Gray focus:outline-none ${grow ? "min-h-[5rem] ":"min-h-[3rem]"} transform duration-500 ease-in`}
    onClick={()=>setGrow(true)} >
      <Slate editor={editor} value={value} onChange={handleChangeSlate}>
       <Toolbar grow={grow} space={space}/>
       <div className="grid grid-cols-10 w-full relative mt-2 px-2 pb-1 sm:grid-cols-14 lg:grid-cols-16">
       {editablecomponent}
       <div className={`relative sm:col-span-1 cursor-pointer ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}
       onClick ={handleSendContent}>
         <BiSend className={`absolute -bottom-[0.05rem] ml-1 w-7 h-7 xl:w-9 xl:h-9 -rotate-12 lg:hover:text-white lg:hover:rotate-12   text-DarkBlueGray ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"} ${cannotComment && "hidden"}`}/>
       </div>
       </div>
     </Slate>
    </div>
    </>
  )
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if(leaf.bold){
    children = <strong>{children}</strong>
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

  return <span className={`${leaf.text === '' ? " pl-[0.1px]": null}`}
   {...attributes}>{children}
   </span>
}

export default CreateParagraph