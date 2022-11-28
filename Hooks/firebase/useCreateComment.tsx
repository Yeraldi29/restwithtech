import { useState } from "react"
import { Timestamp, doc, setDoc, getDocs, collection } from "firebase/firestore"
import { useAuthValue } from "../../store/AuthContext"
import { db } from "../../firebase"
import { Descendant } from "slate"

const useCreateComment = (idNewPost : string | undefined, name: string, parent_id: number ) => {
  const checkout  = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('content') as string) : null
  const [ contentComment, setContentComment ] = useState<Descendant[]>(checkout || [])
  const [ saved, setSaved ] = useState("no")
  const { currentUser } = useAuthValue()

  const handleSaveComment  = async () => {
    setSaved("wait")
    const commentsDoc = await getDocs(collection(db,`comments/${idNewPost}`,`comment`))
    let valueParent_Id = 0
    let authorVerification = false

    if(currentUser && idNewPost){
      if(parent_id !== 0) {
        valueParent_Id = parent_id
      }else{
        valueParent_Id = 0
      }
      
      if(name === currentUser.displayName){
        authorVerification = true
      }else{
        authorVerification = false
      }
      await setDoc(doc(db,`comments/${idNewPost}/comment`,`${commentsDoc.docs.length + 1}`),{
        id: commentsDoc.docs.length + 1,
        parent_id: valueParent_Id,
        data: JSON.stringify(contentComment),
        username: currentUser.displayName,
        imageProfile: currentUser.photoURL,
        create_at: Timestamp.now(),
        author: authorVerification
      }).then(()=>{
        setSaved("yes")
      }).catch(err =>{
        setSaved("no")
        alert(err.message)
        console.log("🚀 ~ file: useCreateComment.tsx ~ line 44 ~ awaitsetDoc ~ err.message", err.message)
      })
    }
  }
  
  
  return  { setContentComment, handleSaveComment, saved, setSaved }
}

export default useCreateComment