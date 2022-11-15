import { Editor} from "slate"
import isUrl from "is-url"
import { wrapLink } from "../utils/link"

const withLinks = (editor: Editor) => {
    const { isInline, insertText, insertData } = editor

    editor.isInline = element => element.type === "link" ? true : isInline(element)

    editor.insertText = text => {
        if (text && isUrl(text)) {
          wrapLink(editor, text)
        } else {
          insertText(text)
        }
    }

    editor.insertData = data => {
        const text = data.getData('text/plain')
    
        if (text && isUrl(text)) {
          wrapLink(editor, text)
        } else {
          insertData(data)
        }
    }

    return editor
}

export default withLinks