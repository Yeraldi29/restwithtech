import { collection, DocumentData, getDocs, query, QuerySnapshot, Timestamp, where } from "firebase/firestore"
import { useTranslation } from "next-i18next"
import { useState, useEffect, useRef } from "react"
import { BiBook, BiBookOpen, BiLike, BiMessageDetail } from "react-icons/bi"
import { BsReply } from "react-icons/bs"
import { db } from "../../../firebase"
import { useAuthValue } from "../../../store/AuthContext"
import { useSlateSaveContent } from "../../../store/CreateContentContext"
import CannotSave from "../../createContent/CannotSave"
import CreateParagraph from "../../createContent/CreateParagraph"
import { serialize, startSerialize } from "../../createContent/plugins/serialize"
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
  dataFather?: string
  replyUsername?: string
  author: boolean
}

const Comment = ({ idNewPost, name, parent_id, parent, data, username,imageProfile, create_at, dataFather,replyUsername, author }: commentProps) => {
  const [ replyComment, setReplyComment ] = useState(false)
  const [ showReplies, setShowReplies ] = useState(false)
  const [ seeMore, setSeeMore ] = useState(false)
  const [ commentReplies, setCommentReplies ] = useState<QuerySnapshot<DocumentData> | null>(null)
  const [ commentRepliesLength, setCommentRepliesLength ] = useState(0)
  const refData = useRef<HTMLDivElement | null>(null)

  const { profile, currentUser } = useAuthValue()
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
      setCommentReplies(await getDocs(query(collection(db,`comments`,`${idNewPost}`,`comment`), where("parent_id","==",parent_id))))
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
      <div className={`flex items-center justify-between w-full border-4 border-b-0  p-2  rounded-xl ${username === currentUser?.displayName ? "border-DarkBlueGray bg-Blue-Gray" :"border-Blue-Gray bg-DarkBlueGray"}`}>
       <div className="flex items-center space-x-2">
         <ImageProfile src={imageProfile} />
         <h3 className="text-lg md:text-xl xl:text-2xl">{username}</h3>
         </div>
        <h5 className={`text-base font-semibold xl:text-lg  ${username === currentUser?.displayName ? "text-BlueDarker" : "text-BabyBlueEyes"}`}>
          {new Date(create_at.toDate()).toLocaleDateString()}
        </h5>
      </div>
      <div className={`relative p-2 ${seeMore ? "h-auto pb-10" : "max-h-64 "} overflow-hidden bg-Lavender-Blue/40 text-BlueDarker rounded-xl border-4 ${username === currentUser?.displayName ? "border-DarkBlueGray" :"border-Blue-Gray "} md:text-lg xl:text-xl`}>
        <div ref={refData}>
          {
            parent > 0 && (
              <div className="w-full bg-BabyBlueEyes/60 p-1 mb-2 text-sm rounded-md border-2 border-DarkBlueGray" >
                <h4 className="text-base text-BlueDarker font-bold ">{replyUsername}</h4>
                <p>{dataFather} <strong> ...</strong></p> 
              </div>
            )
          }
          {startSerialize(JSON.parse(data))}
        </div>
        {refData.current && refData.current?.offsetHeight > 256 && (
           <div className={`absolute bottom-1 right-1 flex items-center space-x-1 p-1 rounded-md border-2 text-white cursor-pointer transform duration-200 ease-out 
           ${username === currentUser?.displayName ? "border-DarkBlueGray bg-Blue-Gray lg:hover:text-DarkBlueGray" :"border-Blue-Gray bg-DarkBlueGray"}`}
           onClick={()=> setSeeMore(!seeMore)}>
           {seeMore ? (<>
            <h5 className="md:text-lg xl:text-xl">{t("seeLess")}</h5>
            <BiBook className="w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9 rotate-12 text-BlueDarker"/>
           </>
           ) : (<>
            <h5 className="md:text-lg xl:text-xl">{t("seeMore")}</h5>
            <BiBookOpen className="w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9 -rotate-12"/>
            </>
           )}
         </div>
        )}
      </div>
      <div className={` flex items-center justify-between p-2 text-sm rounded-xl border-4 border-t-0 ${username === currentUser?.displayName ? "border-DarkBlueGray bg-Blue-Gray" :"border-Blue-Gray bg-DarkBlueGray"}`}>
        <div className="flex items-center space-x-1 cursor-pointer">
          <BiLike className="w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9 -rotate-12"/>
          <h3 className="-rotate-1 md:text-lg xl:text-xl"></h3>
        </div>
        <div className="flex items-center space-x-1">
          <BiMessageDetail className="w-6 md:w-7 md xl:w-9 xl:h-9 :h-7 h-6 rotate-12"/>
          <h3 className="-rotate-1  md:text-lg xl:text-xl">
            {commentRepliesLength}
          </h3>
        </div>
        <div className={`flex items-center space-x-1 cursor-pointer ${username === currentUser?.displayName ? "lg:hover:text-DarkBlueGray" : "lg:hover:text-BabyBlueEyes"} transform duration-200 ease-out`} 
        onClick={handleReply}>
          <BsReply className={`w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9 ${replyComment ? " -rotate-45 text-BlueDarker" :"-rotate-12"} transform duration-300 ease-out`}/>
          <h3 className="rotate-1 md:text-lg xl:text-xl">{t("comment.reply")}</h3>
        </div>
      </div>
       {
        commentRepliesLength > 0 && (
          <div className={`${!showReplies ? "bg-BabyBlueEyes text-BlueDarker hover:bg-DarkBlueGray hover:text-white " : " bg-DarkBlueGray text-white hover:bg-BabyBlueEyes hover:text-BlueDarker hover:border-white"} w-fit mt-2 border-4 border-Blue-Gray rounded-lg rotate-1 p-1  cursor-pointer transform ease-in-out duration-500 md:text-lg xl:text-xl md:p-2`} onClick={handleShowReplies}>
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
            <CreateParagraph option="comment" idNewPost={idNewPost} name={name} parent_id={parent_id} dataFather={serialize(JSON.parse(data))} usernameFather={username}/>
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
            )).reverse()
           }
            <LineThread /> 
          </div>
        )
       }
    </>
  )
}

export default Comment