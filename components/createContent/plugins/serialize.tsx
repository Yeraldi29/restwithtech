import { Descendant } from "slate"
import { ReactNode, ReactFragment } from "react"
import { Text } from "slate"
import escapeHtml from 'escape-html'
import { nanoid } from 'nanoid'


const serializeHtml:(node: Descendant) => ReactNode = (node : Descendant) => {
    if (Text.isText(node)) {
       let string = <span >{node.text}</span>
      if (node.text) {
        string = <span key={ nanoid()}>{string}</span>
      }
      if (node.bold) {
        string = <strong key={nanoid()}>{string}</strong>
      }
      if(node.italic){
        string = <em key={nanoid()}>{string}</em>
      }
      if(node.strikethrough){
        string = <span className=" line-through" key={nanoid()}>{string}</span>
      }
      if(node.underline){
        string = <u className=" underline" key={nanoid()}>{string}</u>
      }
      return string
    }

    const children: ReactNode = node.children.map((n) => serializeHtml(n)).concat(<br key={nanoid()}/>) 

    switch (node.type) {
    case 'link': 
    return <a className="text-Blue-Gray cursor-pointer " target="blank" href={`${escapeHtml(node.url)}`}>{children}</a>
    default: return children
    }
}

 export const startSerialize = (value:Descendant[]) => {
      return value.map(node => serializeHtml(node))
 }