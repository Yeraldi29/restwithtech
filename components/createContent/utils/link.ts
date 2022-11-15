import { Editor, Transforms, Element as SlateElement, Element, Range, Descendant } from "slate"

type LinkElement = {type: 'link', url:string,children:Descendant[]}

export const createLinkNode = (href  : string, text : string) => ({
    type: "link",
    href,
    children: [{ text }]
})

export const createParagraphNode = (children = [{ text: "" }]) => ({
    type: "paragraph",
    children
})

export const insertLink = (editor : Editor, url: string) => {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}

export const wrapLink = (editor: Editor, url: string) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }
    
  const { selection } = editor
  
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : []
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }

}

export const unwrapLink = (editor: Editor) => {
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
}

export const isLinkActive = (editor:Editor) => {
    const [link] = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
}

export const removeLink = (editor : Editor, opts = {}) => {
    Transforms.unwrapNodes(editor, {
      ...opts,
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "link"
    });
}