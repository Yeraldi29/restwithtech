import { useTranslation } from "next-i18next"
import { BiCamera } from "react-icons/bi"
import { useState , useRef, useContext } from "react"
import { profileImage } from "../../store/store"

const UploadImage = ({handleClick}:{handleClick:()=>void}) => {
    const { t } = useTranslation("signIn_logIn")
    const [animation, setAnimation] = useState(false)
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const profileImg = useContext(profileImage)
    const { handleClickImage } = profileImg

    const handleClickFile = () => {
      setAnimation(true)
      inputFileRef.current?.click()
      handleClick
    }

    const addProfileImage = (e:React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target
      const reader = new FileReader()
      
      if(!input.files?.length){
        return
      }

      if(input.files[0]){
        reader.readAsDataURL(input.files[0])
      }

      reader.onload = (e) =>{
          handleClickImage(e.target?.result as string)
      }
    }
    
  return (
    <div className={`${animation && "animate-wiggle "} mx-auto my-8 rounded-xl p-2 bg-Lavender-Blue text-DarkBlueGray border-4 border-dashed border-DarkBlueGray cursor-pointer group`}
     onClick={handleClickFile} onAnimationEnd={()=>{setAnimation(false)}}>
        <BiCamera className=" w-8 h-8 mx-auto lg:group-hover:scale-125 duration-200 ease-in"/>
        <p><small>{t("CompleteProfile.upload")}</small></p>
        <input onChange={addProfileImage} ref={inputFileRef} type="file" name="file" hidden/>
    </div>
  )
}

export default UploadImage