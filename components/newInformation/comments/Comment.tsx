import { Timestamp } from "firebase/firestore"
import { useState, useEffect } from "react"
import { BiLike, BiMessageDetail } from "react-icons/bi"
import { BsReply } from "react-icons/bs"
import { useAuthValue } from "../../../store/AuthContext"
import CreateParagraph from "../../createContent/CreateParagraph"
import CannotComment from "./CannotComment"

interface commentProps {
  idNewPost: string | undefined
  name: string
  id: number
  parent_id: number
  data: string
  username: string | null
  create_at: Timestamp
  author: boolean
}

const Comment = ({ idNewPost, name, id, parent_id, data, username, create_at, author }: commentProps) => {
  const [ replyComment, setReplyComment ] = useState(false)
  const [ cannotComment, setCannotComment ] = useState(false)

  const { profile } = useAuthValue()

  useEffect(()=>{
    if(profile !== "profile"){
      setCannotComment(true)
    }else{
      setCannotComment(false)
    }
  },[profile])
  const handleReply = () => {
    setReplyComment(!replyComment)
  }
  
  return (
    <div >
        <div className="relative flex items-center space-x-2 mt-3 sm:ml-3 md:ml-24 lg:ml-0">
          <div >
            <div className="imageProfile bg-black"></div>
          </div>
          <div>
            <div className="w-fit p-2 border-4 border-b-0 border-Blue-Gray bg-DarkBlueGray rounded-xl  ">
              <h3 className="text-lg md:text-xl">{username}</h3>
              <h6 className=" text-sm md:text-base text-BabyBlueEyes"></h6>
            </div>
            <div className="bg-Lavender-Blue/40 text-BlueDarker rounded-xl  p-2 border-4 border-Blue-Gray md:text-lg">
            </div>
            <div className="flex items-center justify-between p-2 bg-DarkBlueGray rounded-xl border-4 border-Blue-Gray border-t-0 ">
              <div className="flex items-center space-x-1 cursor-pointer">
                <BiLike className="w-7 h-7 -rotate-12"/>
                <h3 className="-rotate-1"></h3>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer">
                <BiMessageDetail className="w-7 h-7 rotate-12"/>
                <h3 className="-rotate-1"></h3>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer" 
              onClick={handleReply}>
                <BsReply className="w-7 h-7 -rotate-12"/>
                <h3 className="rotate-1"></h3>
              </div>
            </div>
          </div>
        </div>
        { replyComment && (
          <div className="relative border-4 border-DarkBlueGray rounded-xl p-4 mt-4 sm:mx-16 sm:w-auto md:mx-36 lg:m-0 lg:mt-4 lg:h-fit " >
          <CreateParagraph cannotComment={cannotComment} option="comment" idNewPost={idNewPost} name={name}/>
          {cannotComment && (
            <CannotComment />
           )}
        </div>
        )}
    </div>
  )
}

export default Comment