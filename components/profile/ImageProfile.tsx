import Image from "next/image"
import { useState, useContext } from "react"
import { profileImage } from "../../pages/store"

const ImageProfile = ({src}:{src:string}) => {
  const [animation, setAnimation] = useState(false)
  const profileImg = useContext(profileImage)
  const { handleClickImage } = profileImg

  const handleClick = ()=>{
    setAnimation(true)
    handleClickImage(src)
  }
  
  return (
    <div className={`${animation && "animate-wiggle "} imageProfile relative `} onClick={handleClick} onAnimationEnd={()=>setAnimation(false)}>
      <Image src={src} className=" rounded-xl lg:hover:scale-125 duration-200 ease-out" alt=""  layout="fill" />
    </div>
  )
}

export default ImageProfile