import Image from "next/image"
import { useContext } from "react" 
import { profileImage } from "../../pages/store"

const BigImageProfile = () => {
  const profileImg = useContext(profileImage)
  const { imageProfile } = profileImg

  return (
    <div className="relative imageProfile w-24 h-24 drop-shadow-lg shadow-lg">
      {
        imageProfile && (
          <Image src={imageProfile} alt="image profile" layout="fill"/>
        )
      }
    </div>
  )
}

export default BigImageProfile