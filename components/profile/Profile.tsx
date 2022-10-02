import { useAuthValue } from "../../pages/AuthContext"
import ImageProfile from "./ImageProfile"

const Profile = () => {
  const { currentUser } = useAuthValue() 

  return (
    <>
    {
        currentUser?.photoURL && (
            <ImageProfile src={currentUser.photoURL}/>
        )
    }
    </>
  )
}

export default Profile