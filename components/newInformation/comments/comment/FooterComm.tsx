import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { BiLike, BiMessageDetail } from 'react-icons/bi'
import { BsReply } from 'react-icons/bs'
import { db } from '../../../../firebase'
import { useAuthValue } from '../../../../store/AuthContext'

interface FooterCommProps {
    username: string | null
    idNewPost: string | undefined
    parent_id: number
    commentRepliesLength: number
    handleReply: () => void
    replyComment: boolean
}

const FooterComm = ({username, idNewPost, parent_id, commentRepliesLength, handleReply, replyComment}:FooterCommProps) => {
  const [ likeComment, setLikeComment ] = useState(false)
  const [ loadingLike, setLoadingLike ] = useState(false)
  const [ likes, setLikes ] = useState(0)

  const { currentUser, profile } = useAuthValue()
  const { t } = useTranslation("newPost")

  const docsLikes = collection(db,`comments/${idNewPost}`,`comment`,`${parent_id}`, "likes")
  const setLike = doc(db,`comments/${idNewPost}`,`comment`,`${parent_id}`, "likes", `${currentUser?.uid}`)
  
  useEffect(()=>{
      const getLikesComment = async () => {
        const getDocsLikes = await getDocs(docsLikes)

        if(getDocsLikes.empty){
          setLikes(0)
        }else{
          setLikes(getDocsLikes.docs.length)
        }
    }
    if(idNewPost !== ""){
      getLikesComment()
    }
  },[idNewPost, likeComment, parent_id])

  useEffect(()=>{
    const handleVerifyLikeComment = async () => {
      const verifyLikeComment = await getDocs(query(docsLikes, where("userId", "==", currentUser?.uid)))
      
      if(verifyLikeComment.empty){
        setLikeComment(false)
      }else{
        setLikeComment(true)
      }
    }

    handleVerifyLikeComment()
  },[parent_id])

  const handleLikeComment = async () => {
    
    if(profile === "profile"){
      const verifyLikeComment = await getDocs(query(docsLikes, where("userId", "==", currentUser?.uid)))
      if(verifyLikeComment.empty){
        setLoadingLike(true)
        await setDoc(setLike,{
          userId: currentUser?.uid
        })
        setLikeComment(true)
        setLoadingLike(false)
      }
    }
  }

  const handleRemoveLikeComment = async () => {
    
    if(profile === "profile"){
      const verifyLikeComment = await getDocs(query(docsLikes, where("userId", "==", currentUser?.uid)))
      if(!verifyLikeComment.empty){
        setLoadingLike(true)
        await deleteDoc(setLike)
        setLikeComment(false)
        setLoadingLike(false)
      }
    }
  }

  return (
    <div className={` flex items-center justify-between p-2 text-sm rounded-xl border-4 border-t-0 ${username === currentUser?.displayName ? "border-DarkBlueGray bg-Blue-Gray" :"border-Blue-Gray bg-DarkBlueGray"}`}>
        <div className="flex items-center space-x-1 cursor-pointer">
          {likeComment ? (
            <BiLike className={`w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9 rotate-45 transform duration-500 ease-in-out ${loadingLike ? " text-gray-400" : "text-BlueDarker"}`} 
            onClick={handleRemoveLikeComment}/>
          ) : (
            <BiLike className={`w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9 -rotate-12  transform duration-500 ease-in-out ${loadingLike ? " text-gray-400" : "text-white"}`} 
            onClick={handleLikeComment}/>
          )
          }
          <h3 className="rotate-1 md:text-lg xl:text-xl">{likes}</h3>
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
  )
}

export default FooterComm