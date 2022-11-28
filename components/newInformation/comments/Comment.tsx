import { collection, DocumentData, getDocs, query, QuerySnapshot, Timestamp, where } from "firebase/firestore"
import { useTranslation } from "next-i18next"
import { useState, useEffect } from "react"
import { BiLike, BiMessageDetail } from "react-icons/bi"
import { BsReply } from "react-icons/bs"
import { db } from "../../../firebase"
import { useAuthValue } from "../../../store/AuthContext"
import CannotSave from "../../createContent/CannotSave"
import CreateParagraph from "../../createContent/CreateParagraph"
import { startSerialize } from "../../createContent/plugins/serialize"
import ImageProfile from "../../profile/ImageProfile"
import CannotComment from "./CannotComment"
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
  author: boolean
  noSave: boolean
  clickSave: boolean
}

const Comment = ({ idNewPost, name, parent_id, parent, data, username,imageProfile, create_at, author, noSave, clickSave }: commentProps) => {
  const [ replyComment, setReplyComment ] = useState(false)
  const [ cannotComment, setCannotComment ] = useState(false)
  const [ showReplies, setShowReplies ] = useState(false)
  const [ commentReplies, setCommentReplies ] = useState<QuerySnapshot<DocumentData> | null>(null)
  const [ commentRepliesLength, setCommentRepliesLength ] = useState(0)

  const { profile } = useAuthValue()
  const { t } = useTranslation("newPost")

  useEffect(()=>{
    const fetchLenght = async () => {
      setCommentRepliesLength(await (await getDocs(query(collection(db,`comments`,`${idNewPost}`,`comment`), where("parent_id","==",parent_id)))).docs.length)
    }
    fetchLenght()
  },[])
  
  useEffect(()=>{
    if(profile !== "profile"){
      setCannotComment(true)
    }else{
      setCannotComment(false)
    }
  },[profile])

  useEffect(()=>{
    const fetchCommentReplies = async () => {
      setCommentReplies(await getDocs(query(collection(db,`comments`,`${idNewPost}`,`comment`), where("parent_id","==",parent_id))))
    }
    if(showReplies){
    fetchCommentReplies()
    }
  },[showReplies])
  
  const handleReply = () => {
    setReplyComment(!replyComment)
  }

  const handleShowReplies = () => {
    setShowReplies(!showReplies)
  }

  return (
    <>
    <LineThread />
    <div className={`ml-4 mt-3 ${parent >= 1 && "ml-8 lg:ml-4"} sm:ml-3 md:ml-24 lg:ml-4`}>
      <div className="flex items-center space-x-2 w-fit border-4 border-b-0 border-Blue-Gray p-2 bg-DarkBlueGray rounded-xl  ">
        <ImageProfile src={imageProfile} />
        <div >
          <h3 className="text-lg md:text-xl">{username}</h3>
          <h6 className=" text-sm md:text-base text-BabyBlueEyes">
            {new Date(create_at.toDate()).toLocaleString()}
          </h6>
        </div>
      </div>
      <div className="bg-Lavender-Blue/40 text-BlueDarker rounded-xl  p-2 border-4 border-Blue-Gray md:text-lg">
        {startSerialize(JSON.parse(data))}
      </div>
      <div className="flex items-center justify-between p-2 bg-DarkBlueGray text-sm rounded-xl border-4 border-Blue-Gray border-t-0 ">
        <div className="flex items-center space-x-1 cursor-pointer">
          <BiLike className="w-6 h-6 -rotate-12"/>
          <h3 className="-rotate-1"></h3>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <BiMessageDetail className="w-6 h-6 rotate-12"/>
          <h3 className="-rotate-1 ">
            {commentRepliesLength}
          </h3>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer" 
        onClick={handleReply}>
          <BsReply className="w-6 h-6 -rotate-12"/>
          <h3 className="rotate-1">{t("comment.reply")}</h3>
        </div>
      </div>
       {
        commentRepliesLength > 0 && (
          <div className={`${!showReplies ? "bg-BabyBlueEyes text-BlueDarker" : " bg-DarkBlueGray text-white"} w-fit mt-2 border-4 border-Blue-Gray rounded-lg rotate-1 p-1`} onClick={handleShowReplies}>
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
          <div className="relative border-4 border-DarkBlueGray rounded-xl p-4 mt-4 sm:mx-16 sm:w-auto md:mx-36 lg:m-0 lg:mt-4 lg:h-fit " >
            <CreateParagraph cannotComment={cannotComment} option="comment" idNewPost={idNewPost} name={name} parent_id={parent_id}/>
            {cannotComment && (
              <CannotComment />
             )}
            { (noSave && clickSave) && (
              <CannotSave />
            )}
          </div>
        )}
       {
        showReplies && (
          commentReplies?.docs.map((doc, index) => {
            if(doc.data().parent_id === parent_id ){
              return <>
              <Comment key={index} idNewPost={idNewPost} name={name} parent_id={doc.data().id} parent={doc.data().parent_id} data={doc.data().data} username={doc.data().username} imageProfile={doc.data().imageProfile} 
              create_at={doc.data().create_at} author={doc.data().author} noSave={noSave} clickSave={clickSave}/>
              </>
            }
          }
          )
        )
       }
    </>
  )
}

export default Comment