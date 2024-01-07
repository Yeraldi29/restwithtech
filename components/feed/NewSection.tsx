import { DocumentData, QuerySnapshot } from "firebase/firestore"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import ItemPost from "./ItemPost"
import LoadingItems from "./LoadingItems"
import Presentation from "./Presentation"

interface NewSectionProps {
    fakeData:{
        image: string
        name: string
        category: string
        title: string
        time: string
    }[]
    data:QuerySnapshot<DocumentData> | null
    title:string
    loading: boolean
    message?:string
    presentationImage?: string
}
const NewSection = ({ fakeData, data, title, message,presentationImage, loading }:NewSectionProps) => {
  const itemsLoading = new Array(6)
  
  const { t } = useTranslation("common")
  const router = useRouter()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
     {( message && presentationImage)  && (<Presentation message={message} presentationImage={presentationImage} title={title}/>)}

      <div className={`md:col-span-2 mx-auto ${(title === t("recent")) ? "hidden": router.asPath !== "/" ? "hidden ":"lg:col-span-3 mt-4"}`}>      
        <h2 className="text-Blue-Gray text-2xl px-2 border-b-4 border-DarkBlueGray  w-fit">{title}</h2>
      </div>
      {loading ? (<>
        {[...itemsLoading].map((noValues,index)=>(
          <LoadingItems index={index} key={index} first={title === t("recent")} />
        ))}
      </>):(
      <>
        {data?.docs.map((data,index) => (
          <ItemPost image={data.data().mainImage} category={data.data().category} time={data.data().create_at} name={data.data().mainTitle} option="data" key={index} index={index} title={data.data().mainTitle}/>
          )).concat(fakeData.map((post,index) => (
            <ItemPost image={post.image} category={post.category} timeFake={post.time} name={post.name} option="fakeData" key={post.name} index={index} title={post.title}/>
          )))
        }
      </>
     )}
    </div>
  )
}

export default NewSection