import Link from "next/link"
import Image from "next/image"
import useChangeLng from "../../Hooks/useChangeLng"
import { useState } from "react"
import { useRouter } from "next/router"

const Language = () => {
  const [click, setClick] = useState(false)
  const [changeTo,flag] = useChangeLng()
  const router = useRouter()

  return (
    <Link href={router.query.newPost === undefined ? "" : {pathname:"", query:{newPost:router.query.newPost}}} locale={changeTo} >
      <div className={`${click && "animate-wiggle"} w-6 h-6 relative cursor-pointer rotate-12 border border-Lavender-Gray rounded-md hover:rotateItem hover:group overflow-hidden`}
      onClick={()=>setClick(true)} onAnimationEnd={()=>setClick(false)}>
        <Image src={flag} fill sizes="(max-width:2000px)" className=" rounded-md hover:scale-150 duration-300" alt='change language'/>
      </div>
    </Link>
  )
}

export default Language
