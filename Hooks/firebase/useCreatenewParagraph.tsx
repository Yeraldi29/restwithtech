import { collection, doc, DocumentData, getDocs, setDoc } from "firebase/firestore"
import { useState } from "react"
import { Descendant } from "slate"
import { db } from "../../firebase"
import { useAuthValue } from "../../store/AuthContext"
import { useSlateSaveContent } from "../../store/CreateContentContext"

const useCreatenewParagraph = (getDocumentName: string | undefined, getDocValues: DocumentData | null | undefined, handleClickAddCreateParagraph: ((option: boolean) => void) | undefined) => {
    const [ contentParagraph, setContentParagraph ] = useState<Descendant[]>([])
    const [ savedParagraph, setSavedParagraph ] = useState("no")

    const { currentUser } = useAuthValue()
    const { handleLoadContentBody } = useSlateSaveContent()

    const handleCreateNewParagraph = async () => {
        setSavedParagraph("wait")
        handleLoadContentBody(false)

        if(currentUser?.uid && handleClickAddCreateParagraph){
            const getDocsContentBodyLength = (await getDocs(collection(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`,"contentBody"))).docs.length
            const docContentBoby = doc(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`,"contentBody",`${getDocsContentBodyLength + 1}`)

            await setDoc(docContentBoby,{
                data: JSON.stringify(contentParagraph),
                order: getDocsContentBodyLength + 1,
                option: "paragraph"
            }).then(()=>{
                setSavedParagraph("yes")
                handleLoadContentBody(true)
                handleClickAddCreateParagraph(false)
            }).catch(()=>{
                setSavedParagraph("no")
                handleLoadContentBody(false)
                handleClickAddCreateParagraph(false)
            })
        }
        
    }
    
  return { setContentParagraph, savedParagraph, handleCreateNewParagraph }
}

export default useCreatenewParagraph