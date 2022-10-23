import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import { motion } from "framer-motion"
import { AiFillBook, AiFillRead } from "react-icons/ai"
import { useRouter } from "next/router"

const ItemPost = ({image,alt,category,time,index}:itemProps) => {
    const [categoryItem,setCategoryItem] = useState("")
    const { t } = useTranslation("common")
    const router = useRouter()

    useEffect(()=>{
        switch (category) {
            case "tech":
                setCategoryItem(t("categories.tech"))
            break
            case "mobile":
                setCategoryItem(t("categories.mobile"))
            break
            case "computers":
                setCategoryItem(t("categories.C&P"))
            break
            case "OS":
                setCategoryItem(t("categories.os"))
            break
            case "code":
                setCategoryItem(t("categories.code"))
            break
        }
    },[category])
    
  return (
    <div className={`flex items-center group bg-DarkBlueGray w-full -rotate-1 even:rotate-1 h-52 sm:h-56 rounded-xl cursor-pointer ${(index=== 0 || index === 1) && "lg:col-span-1"} ${(router.asPath !== "/" && index === 0) && "lg:mt-2"}`}>
      {
        (index !== undefined && index % 2 === 0) && (
        <picture className="w-full h-full rounded-l-xl overflow-hidden">
          <img className="w-full h-full rounded-l-xl object-cover group-hover:scale-125 duration-300 transform ease-in" src={image} alt={alt}  />
        </picture>
        )
      }
      <div className="w-full h-full relative">
        <div className={`w-full bg-Lavender-Blue ${index !== undefined && index % 2 === 0 ? "rounded-tr-xl" : "rounded-tl-xl"}`}>
          <h5 className="text-Blue-Gray text-center text-sm sm:text-md font-bold py-[2px]">{categoryItem}</h5>
        </div>
        <h1 className="text-sm sm:text-md px-2 text-center mt-1 sm:mt-4 w-48 sm:w-64 md:w-48 mx-auto">
          <strong>dui nam nisl et cubilia habitant venenatis commodo interdum nascetur, fermentum ultricies commodo interdum nascetur, fermentum ultricies.</strong>
        </h1>
        <p className={`absolute bottom-1 text-xs sm:text-sm text-Lavender-Blue ${index !== undefined && index % 2 === 0 ? "left-2" :"right-1"}`}>
          {t("hour",{time})}
       </p>
       {/* <div className="flex">
       <AiFillBook className="w-10 h-10" />
       <AiFillRead className="w-10 h-10" />
       </div> */}
      </div>
       {
        (index !== undefined && index % 2 !== 0) && (
        <picture className="w-full h-full rounded-r-xl overflow-hidden">
          <img className="w-full h-full rounded-r-xl object-cover group-hover:scale-125 duration-300 transform ease-in" src={image} alt={alt}  />
        </picture>
        )
      }
    </div>
  )
}

export default ItemPost