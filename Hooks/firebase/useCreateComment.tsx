import { useState, useEffect, ReactNode } from "react"
import { Timestamp, doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"
import { useAuthValue } from "../../store/AuthContext"
import { db } from "../../firebase"

const useCreateComment = (idNewPost : string | undefined, name: string) => {
  const [ contentComment, setContentComment ] = useState<ReactNode>("")
  const [ sendComment, setSendComment ] = useState(false)
  const [ valueId, setValueId ] = useState(0)
  const [ valueParent_Id, setValueParent_Id ] = useState(0)
  const [ authorVerification, setAuthorVerification ] = useState(false)

  const { currentUser } = useAuthValue()
  
  useEffect(()=>{
  },[])
  
  const handleSaveComment  = async ( send: boolean ) => {
    setSendComment(send)

    if(currentUser && sendComment && idNewPost){
      const commentsDoc = await getDocs(collection(db,`comments/${idNewPost}`,`comment`))

        if(commentsDoc.empty){
          setValueId(0)
          setValueParent_Id(0)
        }else{
          setValueId(commentsDoc.docs.length + 1)
        }

        // const commentRef = doc(db,`comments/${idNewPost}/comment`,`${valueId}`)
        // const commentSnap = await getDoc(commentRef)
        
        // if(commentSnap.exists()){
        //   setValueParent_Id(commentSnap.data().id)
        // }
        
        if(name === currentUser.displayName){
          setAuthorVerification(true)
        }else{
          setAuthorVerification(false)
        }

        await setDoc(doc(db,`comments/${idNewPost}/comment`,`${valueId}`),{
         id: valueId,
         parent_id: valueParent_Id,
         data: JSON.stringify(contentComment),
         username: currentUser.displayName,
         create_at: Timestamp.now(),
         author: authorVerification
         }).then(()=>{
         console.log("done");
          
        })

    }
  }
  
  
  return  { setContentComment, handleSaveComment, contentComment }
}

export default useCreateComment