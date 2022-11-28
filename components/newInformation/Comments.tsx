import { useState,useEffect } from "react"
import { useTranslation } from "next-i18next"
import { BiMessageSquare } from "react-icons/bi"
import CreateParagraph from "../createContent/CreateParagraph"
import { useAuthValue } from "../../store/AuthContext"
import Image from "next/image"
import CannotComment from "./comments/CannotComment"
import NoComments from "./comments/NoComments"
import Comment from "./comments/Comment"
import { db } from "../../firebase"
import { collection, DocumentData, getDocs, query, QuerySnapshot, where } from "firebase/firestore"
import { useSlatePlainText } from "../../store/CreateContentContext"
import CannotSave from "../createContent/CannotSave"

const Comments = ({ idNewPost, name }:{ idNewPost: string | undefined, name: string}) => {
    const { t } = useTranslation("newPost")
    const [ parentComments, setParentComments ] = useState<QuerySnapshot<DocumentData> | null>(null)
    const [ commentsLenght, setCommentsLenght ] = useState(0)
    const [ cannotComment, setCannotComment ] = useState(false)
    const [ noSave, setNoSave ] = useState(false)
    const { profile } = useAuthValue()
    const { plainText, clickSave } = useSlatePlainText()

    useEffect(()=>{
      const commentsDoc = async () => {
        if(idNewPost !== ""){
          setCommentsLenght(await (await getDocs(collection(db,`comments`,`${idNewPost}`,`comment`))).docs.length)
          setParentComments(await getDocs(query(collection(db,`comments`,`${idNewPost}`,`comment`), where("parent_id","==",0))))
        }
      }
      commentsDoc()
    },[idNewPost])

    useEffect(()=>{
      if(profile !== "profile"){
        setCannotComment(true)
      }else{
        setCannotComment(false)
      }
    },[profile])

    useEffect(()=>{
      if(plainText.length <= 20){
        setNoSave(true)
      }else{
        setNoSave(false)
      }
    },[plainText])

    
    
  return (
    <>
     <div className="relative mt-8 mb-4 flex space-x-1">
      <h2 className="text-Blue-Gray text-xl xl:text-2xl md:ml-36 lg:ml-0 rotate-1 px-2 mb-3 sm:mt-4 border-b-4 border-DarkBlueGray  w-fit h-fit">
       {t("comments")}
      </h2>
      <div className="w-14 h-14 xl:w-16 xl:h-16  -mt-4 sm:-mt-1 relative flex items-center justify-center">
        <BiMessageSquare className="absolute top-0 w-full h-full rotate-12 text-Blue-Gray" />
        <span className="text-DarkBlueGray text-lg xl:text-xl rotate-12 font-semibold">{commentsLenght}</span>
      </div>
     </div>
     <div>
      <div className="lg:grid lg:grid-cols-5 gap-x-8">
        <div className=" lg:col-span-3">
          <div className="relative border-4 border-DarkBlueGray rounded-xl p-4 sm:mx-16 sm:w-auto md:mx-36 lg:m-0 lg:h-fit " >
            <CreateParagraph cannotComment={cannotComment} option="comment" idNewPost={idNewPost} name={name} parent_id={0}/>
            {cannotComment && (
              <CannotComment />
             )}
            { (noSave && clickSave) && (
            <CannotSave />
            )}
          </div>
          {/* here will be all the comments for this post */}
          {parentComments?.empty ? (
            <NoComments />
          ):parentComments?.docs.map((doc, index) => {
            if(doc.data().parent_id === 0){
              return <>
              <Comment key={index} idNewPost={idNewPost} name={name} parent_id={doc.data().id} parent={doc.data().parent_id} data={doc.data().data} username={doc.data().username} imageProfile={doc.data().imageProfile} 
              create_at={doc.data().create_at} author={doc.data().author} noSave={noSave} clickSave={clickSave}/>
              </>
            }
           })}
        </div>
      <div className="w-full h-96 rotate-1 my-3  sm:my-6 lg:col-span-2 lg:m-0 lg:mb-6 lg:mt-10 sticky top-20">
        <Image className="border-4 border-DarkBlueGray bg-DarkBlueGray rounded-xl mx-auto" src="/giphy.gif" alt="a person listen music" width={360} height={430}/>
      </div>
      </div>
     </div>
    </>
  )
}

export default Comments