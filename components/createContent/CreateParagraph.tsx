import { useTranslation } from "next-i18next"
import { useState, useEffect, useCallback } from "react"
import { BiSend } from "react-icons/bi"
import { createEditor, Descendant, BaseEditor, Range, Transforms } from "slate"
import { Slate, Editable, withReact, ReactEditor, RenderLeafProps, RenderElementProps} from "slate-react"
import { withHistory, HistoryEditor } from "slate-history"
import { isKeyHotkey } from 'is-hotkey'
import Link from "./Link"
import withLinks from "./plugins/withLinks"
import Toolbar from "./Toolbar"
import useCreateComment from "../../Hooks/firebase/useCreateComment"
import { serialize } from "./plugins/serialize"
import CannotSave from "./CannotSave"
import { useAuthValue } from "../../store/AuthContext"
import Loading from "../Loading"
import useCreatenewParagraph from "../../Hooks/firebase/useCreatenewParagraph"

type LinkElement = { type: 'link', url:string, children: Descendant[] }
type CustomELement = { type: 'paragraph',children:CustomText[], url?: string }
type CustomText = { text: string, bold?: boolean, italic?:boolean,strikethrough?:boolean,underline?:boolean, code?: boolean}
type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: LinkElement | CustomELement
    Text: CustomText
  }
}

interface createParagraphProps {
  option: string
  idNewPost: string | undefined
  placeholder: string
  name?: string
  parent_id?: number 
  dataFather?: string
  usernameFather?: string | null
  getDocumentName?:string
  handleClickCancelParagraph?: (option: boolean) => void
  dataEdit?: Descendant[] | null
  order?: number
}

const CreateParagraph = ({ option, idNewPost, placeholder, name, parent_id, dataFather, usernameFather, handleClickCancelParagraph, dataEdit, order }:createParagraphProps) => {
  
  const { t } = useTranslation("newPost")

  const [ editor ] = useState(withLinks(withHistory(withReact(createEditor()))))
  const [ grow, setGrow ] = useState(false)
  const [ clickSend, setClickSend  ] = useState(false)
  const [ keyword, setKeyword ] = useState("")
  const [ plainText, setPlainText ] = useState("")
  const [ editablecomponent, setEditableComponent ] = useState<JSX.Element | null>(null)
  const { setContentComment, handleSaveComment, saved } = useCreateComment(idNewPost, name, parent_id, dataFather, usernameFather)
  const { setContentParagraph, savedParagraph, handleCreateNewParagraph, handleEditParagraph } = useCreatenewParagraph( idNewPost, dataEdit, handleClickCancelParagraph, order)
  const { profile } = useAuthValue()
  const renderLeaf = useCallback((props: RenderLeafProps)=>{return <Leaf {...props} />  },[])
  
  const [ initialValues ] = useState<Descendant[]>(
    dataEdit || [
        {
        type: 'paragraph',
        children: [{ text: '',bold:false,italic:false,strikethrough:false,underline:false,code:false}],
        }
    ]
  )

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
    setKeyword(event.key)
    setClickSend(false)
  }

  useEffect(()=>{
    // I put the Editable component in an useState with an useEffect 'cause I had problems with hydratation when I reload the page
    setEditableComponent( 
      <div className="w-full col-span-9 sm:col-span-13 lg:col-span-15">
        <Editable 
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck={false}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          />
      </div>
    )
  },[])

  useEffect(()=>{
    if(saved === "yes" || savedParagraph === "yes"){
      Transforms.delete(editor, {
        distance: 10000,
        reverse:true
      })
      Transforms.delete(editor, {
        distance: 10000,
      })
    }
  },[saved, savedParagraph])

  const handleChangeSlate = (value:Descendant[]) => {
    // this code appears in Slate's documantation
    const isChange = editor.operations.some(
      op => "set_selection" !== op.type
    )
    if(isChange){
      if(option === "comment"){
        setContentComment(value)
        setPlainText(serialize(value))
      }
      if(option === "createNew" || option === "editParagraph"){
        setContentParagraph(value) 
        setPlainText(serialize(value))
      }
    }
  }

  const handleSendContent = () => {
    setClickSend(true)
    if(plainText.length >= 20){
      if(option === "comment" ){
        handleSaveComment()
        setClickSend(false)
      }
      if(option === "createNew"){
        handleCreateNewParagraph()
        setClickSend(false)
      }
      if(option === "editParagraph"){
        handleEditParagraph()
        setClickSend(false)
      }
    }
  }

  return (
    <>
    <div className={`w-full h-fit ${(saved === "wait" || savedParagraph === "wait") ? "bg-gray-400" : "bg-Lavender-Blue/40"}  rounded-xl border-4 border-Blue-Gray text-BlueDarker md:text-lg xl:text-xl  focus:outline-none ${grow ? "min-h-[5rem] ":"min-h-[3rem]"} transform duration-500 ease-in`}
    onClick={()=>setGrow(true)} >
      <Slate editor={editor} value={initialValues} onChange={handleChangeSlate}>
       <Toolbar grow={grow} keyword={keyword} plainText={plainText}/>
       <div className="grid grid-cols-10 w-full relative mt-2 px-2 pb-1 sm:grid-cols-14 lg:grid-cols-16">
       {editablecomponent}
       {plainText.length >= 1 && (
       <div className={`relative sm:col-span-1 cursor-pointer ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}
       onClick ={handleSendContent}>
         <BiSend className={`absolute -bottom-[0.05rem] ml-1 w-7 h-7 xl:w-9 xl:h-9 -rotate-12 lg:hover:text-white lg:hover:rotate-12   text-DarkBlueGray ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"} ${profile === "account" && "hidden"}`}/>
       </div>
       )
       }
       </div>
     </Slate>
    </div>
    {plainText.length >= 1 && (
      <CannotSave text={t("changes")}/>
    )}
    {(plainText.length <= 20 && clickSend) && (
      <CannotSave text={t("cannotSave")}/>
    )}
    {(saved === "wait"|| savedParagraph === "wait") && (
      <Loading />
    ) }
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