import { ReactNode } from "react"
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
   
   const { scrollYProgress } = useScroll()
   const scaleY = useSpring(scrollYProgress)

   const handleUp = () => {
    window.scrollTo(0,0)
   }

  return (
    <>
    <div className={`${clickState.clickMenu ? "bg-black/50 fixed inset-0 backdrop-blur-sm z-30" : " hidden"}`}></div>
    <div className="relative max-w-7xl mx-2 lg:mx-4 xl:mx-6 3xl:mx-auto ">
      <Header />
      <div className="fixed bottom-2 right-4 z-30 w-16 h-16 bg-Lavender-Blue flex items-center justify-center rounded-xl cursor-pointer -rotate-12"
      onClick={handleUp}>
        <motion.div className="bg-BabyBlueEyes absolute bottom-0 z-40 origin-zero w-full h-full rounded-xl" style={{scaleY}}/>
        <AiOutlineArrowUp className="relative z-50 w-10 h-10 rotate-12 text-DarkBlueGray"/>
      </div>
      <main>
        {children}
      </main>
      </div>
      <div className="mt-20"></div>
    </>
  )
}

export default Layout