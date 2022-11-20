import { useTranslation } from "next-i18next"
import { useState, useEffect, useCallback, useMemo, ReactNode } from "react"
import { BiSend } from "react-icons/bi"
import { createEditor, Descendant, BaseEditor, Node, Range, Transforms} from "slate"
import { Slate, Editable, withReact, ReactEditor, RenderLeafProps, RenderElementProps} from "slate-react"
import { withHistory, HistoryEditor } from "slate-history"
import { isKeyHotkey } from 'is-hotkey'
import Link from "./Link"
import withLinks from "./plugins/withLinks"
import Toolbar from "./Toolbar"
import { startSerialize } from "./plugins/serialize"
import { useCommentContext } from "../../store/store"

type LinkElement = {type: 'link', url:string,children:Descendant[]}
type CustomText = { text: string, bold?: boolean, italic?:boolean,strikethrough?:boolean,underline?:boolean}
type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: LinkElement
    Text: CustomText
  }
}

const CreateParagraph = ({ cannotComment }:{cannotComment: boolean}) => {
  const { t } = useTranslation("newPost")

  const editor = useMemo(()=> withLinks(withHistory(withReact(createEditor()))),[])
  const [ grow, setGrow ] = useState(false)
  const [ space, setSpace ] = useState("")
  const [ editablecomponent, setEditableComponent] = useState<JSX.Element | null>(null)
  const [ slatePlainText, setSlatePlainText] = useState("")
  const [ contentChangeSlate, setContentChange] = useState<Descendant[]>([])
  const renderLeaf = useCallback((props: RenderLeafProps)=>{return <Leaf {...props} />  },[])
  const { handleContentState} = useCommentContext()

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

  const checkout = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('content') as string) : null

  const initialValue: Descendant[] = useMemo(
    () => 
    checkout|| [
      {
      type: 'paragraph',
      children: [{ text: '',bold:false,italic:false,strikethrough:false,underline:false,code:false}],
      },
    ],
    []
  )

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

  const serialize = (value:Descendant[]) => {
    return value.map(n => Node.string(n)).join('\n')
  }

  const handleChangeSlate = (value:Descendant[]) =>{
    const isChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if(isChange){
      const content = JSON.stringify(value)
      localStorage.setItem('content', content)
      setContentChange(value)
      setSlatePlainText(serialize(value))
    }
  }
  
  return (
    <>
    <div className={`w-full h-fit bg-Lavender-Blue/40 rounded-xl border-4 text-BlueDarker md:text-lg xl:text-xl border-Blue-Gray focus:outline-none ${grow ? "min-h-[5rem] ":"min-h-[3rem]"} transform duration-500 ease-in`}
    onClick={()=>setGrow(true)} >
      <Slate editor={editor} value={initialValue} 
       onChange={handleChangeSlate} >
        <Toolbar grow={grow} slatePlainText={slatePlainText} space={space}/>
        <div className="grid grid-cols-10 w-full relative mt-2 px-2 pb-1 sm:grid-cols-14 lg:grid-cols-16">
        {editablecomponent}
        <div className={`relative sm:col-span-1 cursor-pointer ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"}`}>
          <BiSend className={`absolute -bottom-[0.05rem] ml-1 w-7 h-7 xl:w-9 xl:h-9 -rotate-12 lg:hover:text-white lg:hover:rotate-12   text-DarkBlueGray ${!grow ? "max-h-0 opacity-0" : "opacity-100 transform duration-500 ease-in"} ${cannotComment && "hidden"}`} 
          onClick ={ () => {
            handleContentState(contentChangeSlate)
          }}
          />
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