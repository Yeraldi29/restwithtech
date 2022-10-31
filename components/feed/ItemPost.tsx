import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import { motion } from "framer-motion"
import { AiFillRead } from "react-icons/ai"
import { BsNewspaper } from "react-icons/bs"
import { useRouter } from "next/router"
import Link from "next/link"

const ItemPost = ({image,alt,category,time,index, title}:itemProps) => {
    const [categoryItem,setCategoryItem] = useState("")
    const [animation,setAnimation] = useState({hover:false,clicked:false})
    const { t } = useTranslation("common")
    const router = useRouter()

    useEffect(()=>{
        switch (category) {
            case "technologies":
                setCategoryItem(t("categories.tech"))
            break
            case "mobile":
                setCategoryItem(t("categories.mobile"))
            break
            case "computers&laptops":
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
    <Link href={`/${category}/${title}`} locale={router.locale}>
      <div className={`flex items-center group bg-DarkBlueGray w-full -rotate-1 even:rotate-1 h-52 sm:h-56 rounded-xl cursor-pointer ${(index=== 0 || index === 1) && "lg:col-span-1"} ${(router.asPath !== "/" && index === 0) && "lg:mt-2"}`}
      onMouseOver={()=>setAnimation({...animation,hover:true})}
      onMouseLeave={()=>setAnimation({...animation,hover:false})}
      onMouseDown={()=>setAnimation({...animation,clicked:true})}
      >
        {
          (index !== undefined && index % 2 === 0) && (
          <picture className="relative z-20 w-full h-full rounded-l-xl overflow-hidden">
            <img className="w-full h-full bg-white/40 rounded-l-xl object-cover lg:group-hover:scale-125 duration-300 transform ease-in" src={image} alt={alt} />
          </picture>
          )
        }
        <div className="w-full h-full relative">
          <div className={`w-full bg-Lavender-Blue ${index !== undefined && index % 2 === 0 ? "rounded-tr-xl" : "rounded-tl-xl"}`}>
            <h5 className="text-Blue-Gray text-center text-sm sm:text-md font-bold py-[2px]">{categoryItem}</h5>
          </div>
          <motion.h1 className="relative text-sm sm:text-md px-2 text-center mt-1 sm:mt-4 w-48 sm:w-64 md:w-48 mx-auto"
          animate={animation.hover || animation.clicked ? {opacity:0,scale:0.20} : {opacity:100,scale:1}}
          transition={{duration:0.3}}>
            <strong>{title}</strong>
          </motion.h1>
          <p className={`absolute bottom-1 text-xs sm:text-sm text-Lavender-Blue ${index !== undefined && index % 2 === 0 ? "left-2" :"right-1"}`}>
            {t("hour",{time})}
         </p>
         <motion.div 
         className={`absolute bottom-0 w-10 h-10 ${index !== undefined && index % 2 === 0 ? "right-2" :"left-2"}`}
         animate={animation.clicked ? {opacity:0} : animation.hover ? (index !== undefined && index % 2 === 0 ) ? {translateY: -100,translateX:-70,scale:2}:{translateY: -100,translateX:70,scale:2} :{}}
         transition={{duration:0.5}}>
          <BsNewspaper className="w-full h-full" />
         </motion.div>
         <motion.div className={`absolute top-24 w-10 h-10 opacity-0 ${index !== undefined && index % 2 === 0 ? " right-0" :"left-0"}`}
         animate={animation.clicked ? ((index  !== undefined && index % 2 === 0 ) ? {opacity:1,scale:2,x: [0, -150, -75]}:{opacity:1,scale:2,x: [75, 150, 75]}) : {scale:1} }
         transition={{duration:0.5,ease: [0.5, 0.71, 1, 1.5],repeat:Infinity,repeatDelay: 0.5}}
         onAnimationEnd={()=>setAnimation({...animation,clicked:false})}
         >
           <AiFillRead className={`w-full h-full`} />
         </motion.div>
        </div>
         {
           (index !== undefined && index % 2 !== 0) && (
             <picture className="relative z-20 w-full h-full rounded-r-xl overflow-hidden">
            <img className="w-full h-full rounded-r-xl object-cover group-hover:scale-125 duration-300 transform ease-in" src={image} alt={alt}  />
          </picture>
          )
        }
      </div>
    </Link>
  )
}

export default ItemPost