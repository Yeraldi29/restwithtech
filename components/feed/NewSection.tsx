import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import Carousel from "./Carousel"
import ItemPost from "./ItemPost"
import Presentation from "./Presentation"

interface NewSectionProps {
    section:{
        image: string
        name: string
        category: string
        title: string
        time: string
    }[]
    title:string
    message?:string
    presentationImage?: string
}
const NewSection = ({section,title, message,presentationImage}:NewSectionProps) => {
  const { t } = useTranslation("common")
  const router = useRouter()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {title === t("recent") ? (<Carousel />): (router.asPath !== "/" && message && presentationImage)  && (<Presentation message={message} presentationImage={presentationImage} title={title}/>)}

      <div className={`md:col-span-2 mx-auto ${(title === t("recent")) ? "lg:col-span-1": router.asPath !== "/" ? "hidden":"lg:col-span-3 mt-4"}`}>      
        <h1 className="text-Blue-Gray text-2xl rotate-1 px-2 border-b-4 border-white w-fit">{title}</h1>
      </div>
      {
         section.map((post,index) => (
          <ItemPost image={post.image} category={post.category} time={post.time} alt={post.name} key={post.name} index={index} title={post.title}/>
         ))
       }
    </div>
  )
}

export default NewSection