import { RenderElementProps, useSelected } from "slate-react"

const Link = ({ attributes, element, children }:RenderElementProps) => {
  const selected = useSelected()
    
  return (
    <>
        <a className={`text-Blue-Gray ${selected && " border-2 border-DarkBlueGray rounded-lg p-1"}`}  {...attributes} href={element.url}> 
        <InlineChromiumBugfix />
          {children}
        <InlineChromiumBugfix />
        </a>
    </>
  )
}

const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    className=" text-[0]" >
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)

export default Link