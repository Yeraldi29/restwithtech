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
import { collection, DocumentData, getDocs, limit, orderBy, query, QuerySnapshot, where } from "firebase/firestore"
import { useSlateSaveContent } from "../../store/CreateContentContext"

const Comments = ({ idNewPost, name }:{ idNewPost: string | undefined, name: string}) => {
    const { t } = useTranslation("newPost")
    const [ parentComments, setParentComments ] = useState<QuerySnapshot<DocumentData> | null>(null)
    const [ commentsLenght, setCommentsLenght ] = useState(0)
    const [ limitNumber, setLimitNumber ] = useState(3)
    const [ loading, setLoading ] = useState(false)
    const { profile } = useAuthValue()
    const { save } = useSlateSaveContent()

    useEffect(()=>{
      const commentsDoc = async () => {
        setLoading(true)
        const getCommentsLenght = await (await getDocs(collection(db,`comments`,`${idNewPost}`,`comment`))).docs.length
        const getParentComment = await getDocs(query(collection(db,`comments`,`${idNewPost}`,`comment`), where("parent_id","==",0), orderBy("id", "desc"), limit(limitNumber)))
        
          setCommentsLenght(getCommentsLenght)
          setParentComments(getParentComment)
          setLoading(false)
      }

      if(idNewPost !== "" || (save === "yes" && idNewPost !== "") ){
        commentsDoc()
      }
    },[idNewPost, save, limitNumber])

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
            <CreateParagraph option="comment" idNewPost={idNewPost} name={name} parent_id={0} placeholder={t("createComment.placeholder")} />
            {profile === "account" && (
              <CannotComment />
             )}
          </div>
          {parentComments?.empty ? (
            <NoComments />
          ):(
            <div className="border-4 border-DarkBlueGray rounded-xl p-4 pt-1 mt-4 sm:mx-16 sm:w-auto md:mx-36 lg:m-0 lg:mt-4">
              {
                parentComments?.docs.map((doc, index) => (
                  <Comment key={index} idNewPost={idNewPost} name={name} parent_id={doc.data().id} parent={doc.data().parent_id} data={doc.data().data} username={doc.data().username} imageProfile={doc.data().imageProfile} 
                  create_at={doc.data().create_at} author={doc.data().author} />
                ))
              }
              {commentsLenght > limitNumber && (
                <div className="bg-BabyBlueEyes text-BlueDarker hover:bg-DarkBlueGray hover:text-white w-fit mx-auto mt-2 border-4 border-Blue-Gray rounded-lg rotate-1 p-1  cursor-pointer transform ease-in-out duration-500 md:text-lg xl:text-xl md:p-2" onClick={()=>setLimitNumber(limitNumber + 10)}>
                <h3>{t("seeMoreComments")}</h3>
              </div>
              )}
              {
                loading && (
                <div className={`flex items-center justify-center space-x-2 mt-2`}>
                  <div className="w-4 h-4 rounded-full bg-Lavender-Blue drop-shadow-xl animate-expand_close"></div>
                  <div className="w-5 h-5 rounded-full bg-Lavender-Blue drop-shadow-xl animate-expand_close"></div>
                  <div className="w-6 h-6 rounded-full bg-Lavender-Blue drop-shadow-xl animate-expand_close"></div>
                </div>
                ) 
              }
            </div>
          )       
          }
        </div>
      <div className=" max-w-sm h-[22rem] sm:h-96 mx-auto rotate-1 my-3  sm:my-6 lg:col-span-2 lg:m-0 lg:mb-6 lg:mt-10 xl:max-w-md xl:h-[28rem] sticky top-20">
        <Image className="border-4 border-DarkBlueGray bg-DarkBlueGray rounded-xl mx-auto " src="/giphy.gif" alt="a person listen music" fill/>
      </div>
      </div>
     </div>
    </>
  )
}

export default Comments