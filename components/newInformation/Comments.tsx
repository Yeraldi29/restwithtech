import { useState,useEffect } from "react"
import { useTranslation } from "next-i18next"
import { BiMessageSquare } from "react-icons/bi"
import { mostRecents } from "../../arrays/feedImages/allCategories"
import CreateParagraph from "../createContent/CreateParagraph"
import ItemPost from "../feed/ItemPost"
import { useAuthValue } from "../../store/AuthContext"
import Image from "next/image"
import CannotComment from "./comments/CannotComment"
import NoComments from "./comments/NoComments"
import Comment from "./comments/Comment"
import { db } from "../../firebase"
import { collection, DocumentData, getDocs, QuerySnapshot } from "firebase/firestore"

const Comments = ({ idNewPost, name }:{ idNewPost: string | undefined, name: string}) => {
    const { t } = useTranslation("newPost")
    const [ comments, setComments ] = useState<QuerySnapshot<DocumentData> | null>(null)
    const [ cannotComment, setCannotComment ] = useState(false)
    const { profile } = useAuthValue()

    useEffect(()=>{
      const commentsDoc = async () => {
        setComments(await getDocs(collection(db,`comments/${idNewPost}`,`comment`)))
      }
      
      commentsDoc()
    },[])

    useEffect(()=>{
      if(profile !== "profile"){
        setCannotComment(true)
      }else{
        setCannotComment(false)
      }
    },[profile])
    
  return (
    <>
     <div className="relative mt-8 mb-4 flex space-x-1">
      <h2 className="text-Blue-Gray text-xl xl:text-2xl md:ml-36 lg:ml-0 rotate-1 px-2 mb-3 sm:mt-4 border-b-4 border-DarkBlueGray  w-fit h-fit">
       {t("comments")}
      </h2>
      <div className="w-14 h-14 xl:w-16 xl:h-16  -mt-4 sm:-mt-1 relative flex items-center justify-center">
        <BiMessageSquare className="absolute top-0 w-full h-full rotate-12 text-Blue-Gray" />
        <span className="text-DarkBlueGray text-lg xl:text-xl rotate-12 font-semibold"></span>
      </div>
     </div>
     <div>
      <div className="lg:grid lg:grid-cols-5 gap-x-8">
        <div className=" lg:col-span-3">
          <div className="relative border-4 border-DarkBlueGray rounded-xl p-4 sm:mx-16 sm:w-auto md:mx-36 lg:m-0 lg:h-fit " >
            <CreateParagraph cannotComment={cannotComment} option="comment" idNewPost={idNewPost} name={name}/>
            {cannotComment && (
              <CannotComment />
             )}
          </div>
          {/* here will be all the comments for this post */}
          {comments?.empty ? (
            <NoComments />
          ):comments?.docs.map((doc, index) => (
            <Comment key={index} idNewPost={idNewPost} name={name} id={doc.data().id} parent_id={doc.data().parent_id} data={doc.data().data} username={doc.data().username} create_at={doc.data().create_at} author={doc.data().author}/>
          ))}
        </div>
      <div className="w-full h-96 rotate-1 my-3  sm:my-6 lg:col-span-2 lg:m-0 lg:mb-6 lg:mt-10 sticky top-20">
        <Image className="border-4 border-DarkBlueGray bg-DarkBlueGray rounded-xl mx-auto" src="/giphy.gif" alt="a person listen music" width={360} height={430}/>
      </div>
      </div>
      <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {
         mostRecents.map((post,index) => (
          <ItemPost image={post.image} category={post.category} time={post.time} name={post.name} key={post.name} index={index} title={post.title}/>
         ))
       }
      </div>
     </div>
    </>
  )
}

export default Comments