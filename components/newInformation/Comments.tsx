import { useTranslation } from "next-i18next"
import { BiMessageAltX, BiMessageSquare } from "react-icons/bi"
import { mostRecents } from "../../arrays/feedImages/allCategories"
import { useAuthValue } from "../../store/AuthContext"
import CreateParagraph from "../createContent/CreateParagraph"
import ItemPost from "../feed/ItemPost"

const Comments = () => {
    const { t } = useTranslation("newPost")
    const { currentUser } = useAuthValue()
  return (
    <>
     <div className="relative mt-8 mb-4 flex -space-x-2">
      <h2 className="text-Blue-Gray text-lg xl:text-xl rotate-1 px-2 mb-3 sm:mt-4 border-b-4 border-white w-fit h-fit">
       {t("comments")}
      </h2>
      <div className="w-14 h-14 -mt-8 relative flex items-center justify-center">
        <BiMessageSquare className="absolute top-0 w-full h-full -rotate-12 text-Blue-Gray" />
        <span className="text-DarkBlueGray text-lg -rotate-12 font-semibold">0</span>
      </div>
     </div>
     <div>
      <div className="lg:grid lg:grid-cols-5 gap-x-8">
        <div className=" lg:col-span-3">
          <div className=" border-4 border-DarkBlueGray rounded-xl p-4 sm:mx-16 sm:w-auto md:mx-36 lg:m-0 lg:h-fit ">
            <CreateParagraph />
          </div>
          {/* here will be all the comments for this post */}
          <div className="h-52 my-6 sm:mx-16 md:mx-36 lg:mx-10 lg:my-10 flex items-center space-x-1 justify-center border-4 border-gray-500 bg-Lavender-Blue/40 rounded-xl rotate-1">
            <div>
              <h1 className="text-gray-500 text-2xl -rotate-1">{t("noComment")}</h1>
              <BiMessageAltX className="w-12 h-12 mx-auto text-gray-500"/>
            </div>
          </div>
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
     {/* <div>
      <p>
        {t("createComment.noAccount.you")} <span className=" font-shadow">{t("createComment.noAccount.anonymous")}</span> 
        <span>{t("createComment.noAccount.or")}</span>
        <span>{t("createComment.noAccount.sign-in")}/</span>
        <span>{t("createComment.noAccount.log-in")}</span>
      </p>
     </div> */}
    </>
  )
}

export default Comments