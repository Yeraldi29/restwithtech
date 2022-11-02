import { ReactNode, useState, useEffect } from "react"
import { menuClick } from "../store/store"
import Header from "./Header"
import {useContext} from 'react'
import { AiOutlineArrowUp } from "react-icons/ai"
import { motion, useScroll, useSpring } from "framer-motion"

interface Props {
  children?: ReactNode
}

const Layout = ({children}:Props) => {
   const clickState = useContext(menuClick)
   const [ appear, setAppear] = useState(false)
   
   const { scrollYProgress, scrollY } = useScroll()
   const scaleY = useSpring(scrollYProgress)

   useEffect(()=>{
    scrollY.onChange(lasted => {
      if(lasted > 300){
        setAppear(true)
      }else{
        setAppear(false)
      }
    })
   },[scrollY])

   const handleUp = () => {
    window.scrollTo(0,0)
   }

  return (
    <>
    <div className={`${clickState.clickMenu ? "bg-black/50 fixed inset-0 backdrop-blur-sm z-30" : " hidden"}`}></div>
    <div className="relative max-w-7xl mx-2 sm:mx-3 lg:mx-4 xl:mx-6 3xl:mx-auto ">
      <Header />
      <motion.div className={`fixed bottom-2 right-4 w-16 h-16 bg-Lavender-Blue flex items-center justify-center rounded-xl cursor-pointer group transform duration-300  ${appear ? "z-30":"-z-50"}`}
      onClick={handleUp}
      initial={{ opacity: 0 }}
      animate={appear ? { opacity: 100, translateY:0, rotate:-12} : { opacity:0,translateY:-50, rotate:12} }
      transition={{duration:0.3, ease:[0.5, 0.71, 1, 1.5]}}
       >
        <motion.div className="bg-BabyBlueEyes absolute bottom-0 z-40 origin-zero w-full h-full rounded-xl"
         style={{scaleY}} />
        <AiOutlineArrowUp className="relative z-50 w-10 h-10 rotate-12 text-DarkBlueGray lg:group-hover:text-white"/>
      </motion.div>
      <main>
        {children}
      </main>

      
      </div>
      <div className="mt-20"></div>
    </>
  )
}

export default Layout