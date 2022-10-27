import Link from "next/link"
import Image from "next/image"
import useChangeLng from "../../Hooks/useChangeLng"
import { useState } from "react"

const Language = () => {
  const [click, setClick] = useState(false)
  const [changeTo,flag] = useChangeLng()
    
  return (
    <Link href={""} locale={changeTo} >
      <div className={`${click && "animate-wiggle"} w-6 h-6 relative cursor-pointer rotate-12 border border-Lavender-Gray rounded-md hover:rotateItem hover:group overflow-hidden`}
      onClick={()=>setClick(true)} onAnimationEnd={()=>setClick(false)}>
        <Image src={flag} fill={true} className=" rounded-md hover:scale-150 duration-300" alt='change language'/>
      </div>
    </Link>
  )
}

export default Language
