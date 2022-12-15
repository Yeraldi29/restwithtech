import Image from "next/image"
import { useAuthValue } from "../../../store/AuthContext"

const UserHeader = () => {

    const { currentUser } = useAuthValue()

  return (
    <>
    <div className="flex items-center justify-center space-x-4 rounded-xl p-2 py-4 ">
       {currentUser?.photoURL && (
        <div className=" w-24 h-24 relative imageProfile bg-DarkBlueGray border-DarkBlueGray ">
         <Image src={currentUser.photoURL} alt="user's image" fill/>
        </div>
       )}
        <div className=" max-w-[12rem] break-words">
         <h1 className="text-2xl">{currentUser?.displayName}</h1>
        </div>
    </div>
    <div>
        
    </div>
    </>
  )
}

export default UserHeader