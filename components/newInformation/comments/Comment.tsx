import { collection, DocumentData, getDocs, orderBy, query, QuerySnapshot, Timestamp, where } from "firebase/firestore"
import { useTranslation } from "next-i18next"
import { useState, useEffect } from "react"
import { db } from "../../../firebase"
import { useAuthValue } from "../../../store/AuthContext"
import { useSlateSaveContent } from "../../../store/CreateContentContext"
import CreateParagraph from "../../createContent/CreateParagraph"
import { serialize } from "../../createContent/plugins/serialize"
import CannotComment from "./CannotComment"
import FeedComm from "./comment/FeedComm"
import FooterComm from "./comment/FooterComm"
import HeaderComm from "./comment/HeaderComm"
import LineThread from "./LineThread"

interface commentProps {
  idNewPost: string | undefined
  name: string
  parent_id: number
  parent: number
  data: string
  username: string | null
  imageProfile: string
  create_at: Timestamp
  dataFather?: string
  replyUsername?: string
  author: boolean
}

const Comment = ({ idNewPost, name, parent_id, parent, data, username,imageProfile, create_at, dataFather,replyUsername, author }: commentProps) => {
  const [ replyComment, setReplyComment ] = useState(false)
  const [ showReplies, setShowReplies ] = useState(false)
  const [ commentReplies, setCommentReplies ] = useState<QuerySnapshot<DocumentData> | null>(null)
  const [ commentRepliesLength, setCommentRepliesLength ] = useState(0)
  
  const { profile } = useAuthValue()
  const { save } = useSlateSaveContent()
  const { t } = useTranslation("newPost")

  useEffect(()=>{
    const fetchLenght = async () => {
      const commentRepliesLength = (await getDocs(query(collection(db,`comments`,`${idNewPost}`,`comment`), where("parent_id","==",parent_id)))).docs.length
      
      setCommentRepliesLength(commentRepliesLength)
    }
    fetchLenght()

  },[save, idNewPost])

  useEffect(()=>{
    const fetchCommentReplies = async () => {
      setCommentReplies(await getDocs(query(collection(db,`comments`,`${idNewPost}`,`comment`), where("parent_id","==",parent_id),orderBy("id", "desc"))))
    }
    if(showReplies){
    fetchCommentReplies()
    }
  },[showReplies, save])

  const handleReply = () => {
    setReplyComment(true)
    setShowReplies(true)
  }

  const handleShowReplies = () => {
    setShowReplies(!showReplies)
  }

  return (
    <>
    <div className={` mt-3 ${parent >= 1 ? "ml-8 ": "lg:mx-0"} break-words `}>
      <HeaderComm username={username} imageProfile={imageProfile} create_at={create_at} author={author} />
      <FeedComm username={username} parent={parent} replyUsername={replyUsername} dataFather={dataFather} data={data} />
      <FooterComm username={username} idNewPost={idNewPost} parent_id={parent_id} 
      commentRepliesLength={commentRepliesLength} handleReply={handleReply} replyComment={replyComment}/>
       {
        commentRepliesLength > 0 && (
          <div className={`${!showReplies ? "bg-BabyBlueEyes text-BlueDarker hover:bg-DarkBlueGray hover:text-white " : " bg-DarkBlueGray text-white hover:bg-BabyBlueEyes hover:text-BlueDarker hover:border-white"} 
          w-fit mt-2 border-4 border-Blue-Gray rounded-lg rotate-1 p-1  cursor-pointer transform ease-in-out duration-500 md:text-lg xl:text-xl md:p-2`} onClick={handleShowReplies}>
           {commentRepliesLength === 1 ? (
            <h3 className=" -rotate-1 font-semibold">{
              showReplies ? (t("comment.hideReply")): (t("comment.showReply"))
            }</h3>
           ):(
            <h3 className="-rotate-1 font-semibold">{
              showReplies ? (t("comment.hideReplies")): (t("comment.showReplies"))
            }</h3>
           )}
          </div>
        )
       }
    </div>
       { replyComment && (
          <div className={`relative mt-4 lg:h-fit ${parent >= 1 ? "ml-8 ": "lg:mx-0"}`} >
            <div className="w-full my-4 border-2 border-dashed border-DarkBlueGray rounded-md"></div>
            <CreateParagraph option="comment" idNewPost={idNewPost} name={name} parent_id={parent_id} dataFather={serialize(JSON.parse(data))} usernameFather={username} placeholder={t("createComment.placeholder")} />
            {profile === "account" && (
              <CannotComment />
             )}
            <div className="w-full my-4 border-2 border-dashed border-DarkBlueGray rounded-md"></div>
          </div>
        )}
       {
        (showReplies && !commentReplies?.empty) && (
          <div className="relative">
            {
            commentReplies?.docs.filter(doc => doc.data().parent_id === parent_id ).map((doc, index) => (
              <Comment key={index} idNewPost={idNewPost} name={name} parent_id={doc.data().id} parent={doc.data().parent_id} data={doc.data().data} username={doc.data().username} imageProfile={doc.data().imageProfile} 
              create_at={doc.data().create_at} dataFather={doc.data().replyComment} replyUsername={doc.data().replyUsername} author={doc.data().author} />
            ))
           }
            <LineThread /> 
          </div>
        )
       }
    </>
  )
}

export default Comment