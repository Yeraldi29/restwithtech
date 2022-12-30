import { collection, doc, DocumentData, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { Descendant } from "slate"
import { db } from "../../firebase"
import { useAuthValue } from "../../store/AuthContext"
import { useSlateSaveContent } from "../../store/CreateContentContext"


const useCreatenewParagraph = (getDocumentName: string | undefined, dataEdit: Descendant[] | null | undefined, handleClickCancelParagraph: ((option: boolean) => void) | undefined, order: number | null | undefined) => {
    
    const [ contentParagraph, setContentParagraph ] = useState<Descendant[]>([])
    const [ savedParagraph, setSavedParagraph ] = useState("no")

    const { currentUser } = useAuthValue()
    const { handleLoadContentBody } = useSlateSaveContent()

    const handleCreateNewParagraph = async () => {
        setSavedParagraph("wait")
        handleLoadContentBody(false)

        if(currentUser?.uid && handleClickCancelParagraph){
            const getDocsContentBodyLength = (await getDocs(collection(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`,"contentBody"))).docs.length
            const docContentBody = doc(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`,"contentBody",`${getDocsContentBodyLength + 1}`)

            await setDoc(docContentBody,{
                data: JSON.stringify(contentParagraph),
                order: getDocsContentBodyLength + 1,
                option: "paragraph"
            }).then(()=>{
                setSavedParagraph("yes")
                handleLoadContentBody(true)
                handleClickCancelParagraph(false)
            }).catch(()=>{
                setSavedParagraph("no")
                handleLoadContentBody(false)
                handleClickCancelParagraph(false)
            })
        }
        
    }

    const handleEditParagraph = async () => {
        setSavedParagraph("wait")
        handleLoadContentBody(false)
        
        if(currentUser?.uid && handleClickCancelParagraph){
            const docContentBody = doc(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`,"contentBody",`${order}`)

            await updateDoc(docContentBody,{
                data: JSON.stringify(contentParagraph),
            }).then(()=>{
                setSavedParagraph("yes")
                handleLoadContentBody(true)
                handleClickCancelParagraph(false)
            }).catch(()=>{
                setSavedParagraph("no")
                handleLoadContentBody(false)
                handleClickCancelParagraph(false)
            })
        }
    }
    
  return { setContentParagraph, savedParagraph, handleCreateNewParagraph, handleEditParagraph }
}

export default useCreatenewParagraph