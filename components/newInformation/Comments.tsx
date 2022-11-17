import { useState,useEffect } from "react"
import { useTranslation } from "next-i18next"
import { BiMessageAltX, BiMessageSquare } from "react-icons/bi"
import { mostRecents } from "../../arrays/feedImages/allCategories"
import CreateParagraph from "../createContent/CreateParagraph"
import ItemPost from "../feed/ItemPost"
import { useAuthValue } from "../../store/AuthContext"
import Link from "next/link"
import Image from "next/image"

const Comments = () => {
    const { t } = useTranslation("newPost")
    const [ cannotComment, setCannotComment ] = useState(false)
    const { profile } = useAuthValue()

    useEffect(()=>{
      if(profile !== "profile"){
        setCannotComment(true)
      }else{
        setCannotComment(false)
      }
    },[])
    
  return (
    <>
     <div className="relative mt-8 mb-4 flex space-x-1">
      <h2 className="text-Blue-Gray text-xl xl:text-2xl md:ml-36 lg:ml-0 rotate-1 px-2 mb-3 sm:mt-4 border-b-4 border-DarkBlueGray  w-fit h-fit">
       {t("comments")}
      </h2>
      <div className="w-14 h-14 xl:w-16 xl:h-16  -mt-4 sm:-mt-1 relative flex items-center justify-center">
        <BiMessageSquare className="absolute top-0 w-full h-full rotate-12 text-Blue-Gray" />
        <span className="text-DarkBlueGray text-lg xl:text-xl rotate-12 font-semibold">0</span>
      </div>
     </div>
     <div>
      <div className="lg:grid lg:grid-cols-5 gap-x-8">
        <div className=" lg:col-span-3">
          <div className="relative border-4 border-DarkBlueGray rounded-xl p-4 sm:mx-16 sm:w-auto md:mx-36 lg:m-0 lg:h-fit " >
            <CreateParagraph cannotComment={cannotComment}/>
            {cannotComment && (
              <div className=" w-full h-full flex items-center justify-center rounded-lg -rotate-1 mt-4 p-4 bg-DarkBlueGray border-4 border-Blue-Gray">
                <h1 className=" text-2xl  rotate-1 text-center">
                  {t("createComment.noAccount.you")}<br /> 
                  <Link href={"/log-in"}><span className=" text-Lavender-Blue lg:hover:text-3xl "> {t("createComment.noAccount.log-in")}</span></Link>
                  <span> {t("createComment.noAccount.or")}</span>
                  <Link href="/sign-in" ><span className=" text-BabyBlueEyes lg:hover:text-3xl"> {t("createComment.noAccount.sign-in")}</span></Link>
                </h1>
              </div>
             )}
          </div>
          {/* here will be all the comments for this post */}
          <div className="h-52 my-6 sm:mx-16 md:mx-36 lg:mx-10 lg:my-10 flex items-center space-x-1 justify-center border-4 border-gray-500 bg-Lavender-Blue/40 rounded-xl rotate-1">
            <div>
              <h1 className="text-gray-500 text-2xl -rotate-1">{t("noComment")}</h1>
              <BiMessageAltX className="w-12 h-12 xl:w-16 xl:h-16 mx-auto text-gray-500"/>
            </div>
          </div>
        </div>
      <div className="w-full h-96 rotate-1 my-3  sm:my-6 lg:col-span-2 lg:m-0 lg:mb-6 lg:mt-10 sticky top-20">
        <Image className="border-4 border-DarkBlueGray bg-DarkBlueGray rounded-xl mx-auto" src="/giphy.gif" alt="" width={360} height={430}/>
      </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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