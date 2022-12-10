import { useState } from "react"
import { Timestamp, doc, setDoc, getDocs, collection } from "firebase/firestore"
import { useAuthValue } from "../../store/AuthContext"
import { db } from "../../firebase"
import { Descendant } from "slate"
import { useSlateSaveContent } from "../../store/CreateContentContext"

const useCreateComment = (idNewPost? : string | undefined, name?: string, parent_id?: number, dataFather?:string, usernameFather?: string | null ) => {
  const checkout  = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('content') as string) : null
  const [ contentComment, setContentComment ] = useState<Descendant[]>(checkout || [])
  const [ saved, setSaved ] = useState("no")
  const { currentUser } = useAuthValue()
  const { handleSave } = useSlateSaveContent()

  const handleSaveComment  = async () => {
    setSaved("wait")
    handleSave("wait")
    const commentsDoc = await getDocs(collection(db,`comments/${idNewPost}`,`comment`))
    const setComment = doc(db,`comments/${idNewPost}/comment`,`${commentsDoc.docs.length + 1}`)

    let valueParent_Id = 0
    let authorVerification = false
    let replyComment: string | undefined = ""
    let replyUsername: string | null | undefined = ""

    if(currentUser && idNewPost){
      if(parent_id !== 0 && parent_id) {
        valueParent_Id = parent_id
        replyComment = dataFather?.substring(0, 90)
        replyUsername = usernameFather
      }else{
        valueParent_Id = 0
        replyComment = ""
        replyUsername = ""
      }
      
      if(name === currentUser.displayName){
        authorVerification = true
      }else{
        authorVerification = false
      }

      await setDoc(setComment,{
        id: commentsDoc.docs.length + 1,
        parent_id: valueParent_Id,
        data: JSON.stringify(contentComment),
        username: currentUser.displayName,
        imageProfile: currentUser.photoURL,
        create_at: Timestamp.now(),
        replyComment: replyComment,
        replyUsername: replyUsername,
        author: authorVerification,
      }).then(()=>{
        setSaved("yes")
        handleSave("yes")
      }).catch(err =>{
        setSaved("no")
        handleSave("no")
        alert(err.message)
        console.log("🚀 ~ file: useCreateComment.tsx ~ line 44 ~ awaitsetDoc ~ err.message", err.message)
      })

    }
  }
  
  return  { setContentComment, handleSaveComment, saved }
}

export default useCreateComment