import { useState, useEffect,ReactNode } from "react"
import { collection, addDoc } from "firebase/firestore"
import { useAuthValue } from "../../store/AuthContext"
import { db } from "../../firebase"

const useCreateComment = (idNewPost : string | undefined) => {
  const [ contentComment, setContentComment] = useState<ReactNode>("")
  const [ sendComment, setSendComment ] = useState(false)

  const { currentUser } = useAuthValue()
  
  useEffect(()=>{
  },[])
  
  const handleSaveComment  = async ( send: boolean ) => {
    setSendComment(send)
    
    if(currentUser){
      if(sendComment){
        const docRef = await addDoc(collection(db, `commentsFor(${idNewPost})`),{
          id:"",
          parent_id:"",
          data: contentComment,
          username: "",
          create_at:"",
          author:""
        })
      }
    }
  }
  
  
  return  { setContentComment, handleSaveComment }
}

export default useCreateComment