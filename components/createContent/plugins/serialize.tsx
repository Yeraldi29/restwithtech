import { Descendant } from "slate"
import { ReactNode, ReactFragment } from "react"
import { Text } from "slate"
import escapeHtml from 'escape-html'

const serializeHtml:(node: Descendant) => JSX.Element | ReactFragment = (node : Descendant) => {
    if (Text.isText(node)) {
       let string = <span>{node.text}</span>
      if (node.text) {
        string = <span>{string}</span>
      }
      if (node.bold) {
        string = <strong>{string}</strong>
      }
      if(node.italic){
        string = <em>{string}</em>
      }
      if(node.strikethrough){
        string = <span className=" line-through">{string}</span>
      }
      if(node.underline){
        string = <u className=" underline">{string}</u>
      }
      return string
    }

    const children: ReactNode = node.children.map(n =>serializeHtml(n))

    switch (node.type) {
    case 'link': 
    return <a className="text-Blue-Gray cursor-pointer " target="blank" href={`${escapeHtml(node.url)}`}>{children}</a>
    default: return children
    }
  }
 export const startSerialize = (value:Descendant[]) => {
      return value.map(node => serializeHtml(node))
 }