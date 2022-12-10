import { Timestamp } from "firebase/firestore"
import { useAuthValue } from "../../../../store/AuthContext"
import ImageProfile from "../../../profile/ImageProfile"

interface HeaderCommProps {
    username:string | null
    imageProfile:string
    create_at: Timestamp
}

const HeaderComm = ({username,imageProfile, create_at}:HeaderCommProps) => {
    const { currentUser } = useAuthValue()
    
  return (
    <div className={`flex items-center justify-between w-full border-4 border-b-0  p-2  rounded-xl ${username === currentUser?.displayName ? "border-DarkBlueGray bg-Blue-Gray" :"border-Blue-Gray bg-DarkBlueGray"}`}>
       <div className="flex items-center space-x-2">
         <ImageProfile src={imageProfile} />
         <h3 className="text-lg md:text-xl xl:text-2xl">{username}</h3>
         </div>
        <h5 className={`text-base font-semibold xl:text-lg  ${username === currentUser?.displayName ? "text-BlueDarker" : "text-BabyBlueEyes"}`}>
          {new Date(create_at.toDate()).toLocaleDateString()}
        </h5>
    </div>
  )
}

export default HeaderComm
