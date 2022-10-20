import { useTranslation } from "next-i18next"
import { mostRecents } from "../../arrays/feedImages/allCategories"
import Carousel from "./Carousel"
import ItemPost from "./ItemPost"

const Recomendations = () => {
  const { t } = useTranslation("common")
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      <Carousel /> 
      <div className="md:col-span-2 lg:col-span-1">      
        <h1 className="text-Blue-Gray text-xl rotate-1 px-2 border-b-4 border-white w-fit">{t("recent")}</h1>
      </div>
      {
         mostRecents.map((post,index) => (
          <ItemPost image={post.image} category={post.category} time={post.time} alt={post.name} key={post.name} index={index}/>
         ))
       }
    </div>
  )
}

export default Recomendations