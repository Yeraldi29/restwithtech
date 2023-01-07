import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import { motion } from "framer-motion"
import { AiFillRead } from "react-icons/ai"
import { BsNewspaper } from "react-icons/bs"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import { itemProps } from "../../types"
import { useCurrentTime } from "../../Hooks/useCurrentTime"

const ItemPost = ({image,name,category, time, timeFake, index, title, option}:itemProps) => {
    const [categoryItem,setCategoryItem] = useState("")
    const [animation,setAnimation] = useState({hover:false,clicked:false})

    const { t } = useTranslation("common")
    const { timeString } = useCurrentTime(time)
    const router = useRouter()

    useEffect(()=>{
        switch (category) {
            case "tech":
                setCategoryItem(t("categories.tech"))
            break
            case "mobile":
                setCategoryItem(t("categories.mobile"))
            break
            case "C&P":
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
    <Link href={`/${category}/${encodeURIComponent(title)}`} as={`/${category}/${title}`} locale={router.locale}>
      { index !== undefined && (
        <div className="flex h-full items-center">
          <div className={`relative group bg-DarkBlueGray w-full h-96 md:h-[26rem] lg:h-[31rem] ${index % 2 === 0 ? "-rotate-1" : "even:rotate-1"}  rounded-xl cursor-pointer border-4 border-Blue-Gray `}
          onMouseOver={()=>setAnimation({...animation,hover:true})}
          onMouseLeave={()=>setAnimation({...animation,hover:false})}
          onMouseDown={()=>setAnimation({...animation,clicked:true})}
          >
            <div className="overflow-hidden border-b-4 border-Blue-Gray rounded-t-md">
              <div className="relative z-20 w-full h-28 sm:h-40 rounded-t-md overflow-hidden ">
              <Image className="rounded-t-md bg-white/40 opacity-70 object-cover  lg:group-hover:scale-125 duration-300 transform ease-in" src={image} alt={name} fill/>
              </div>
            </div>
            <div >
             <div className="flex items-center mt-2 mx-2 justify-between text-sm xl:text-base">
               <div className={`w-fit bg-Lavender-Blue rounded-md px-1 `}>
                 <h5 className="text-Blue-Gray text-center font-bold py-[2px]">{categoryItem}</h5>
               </div>
                 <h5 className=" text-Lavender-Blue ">
                 {option === "fakeData" ? (
                  <span>{t("hour",{timeFake})}</span>
                 ): option === "data" && (
                  <span>{timeString}</span>
                 )}
                 </h5>
             </div>
             <motion.h1 className="relative w-full text-2xl xl:text-3xl px-2 mt-2 sm:mt-4 mx-auto"
             animate={animation.hover || animation.clicked ? {opacity:0,scale:0.20} : {opacity:100,scale:1}}
             transition={{duration:0.3}}>
              {title.substring(0,125)}
              {title.length > 125 && (
                <span>...</span>
              )}
             </motion.h1>
             <motion.div 
             className={`absolute bottom-1 w-12 h-12 ${index !== undefined && index % 2 === 0 ? "right-2" :"left-2"}`}
             animate={animation.clicked ? {opacity:0} : animation.hover ? (index !== undefined && index % 2 === 0 ) ? {translateY: -100,translateX:-70,scale:2}:{translateY: -100,translateX:70,scale:2} :{}}
             transition={{duration:0.5}}>
              <BsNewspaper className="w-full h-full" />
             </motion.div>
             <motion.div className={`absolute bottom-20 right-16 lg:bottom-32 w-12 h-12 opacity-0 ${index !== undefined && index % 2 === 0 ? " right-0" :"left-0"}`}
             animate={animation.clicked ? ((index  !== undefined && index % 2 === 0 ) ? {opacity:1,scale:2,x: [0, -150, -75]}:{opacity:1,scale:2,x: [75, 150, 75]}) : {scale:1} }
             transition={{duration:0.5,ease: [0.5, 0.71, 1, 1.5],repeat:Infinity,repeatDelay: 0.5}}
             onAnimationEnd={()=>setAnimation({...animation,clicked:false})}
             >
              <AiFillRead className={`w-full h-full`} />
             </motion.div>
            </div>
          </div>
        </div>
      )}
    </Link> 
  )
}

export default ItemPost