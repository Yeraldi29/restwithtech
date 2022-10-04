import {useContext} from "react"
import { menuClick } from "../../../store/store"
import Categories from "./Categories"
import Bubbles from "./Bubbles"
import UserAccount from "./UserAccount"
import { useAuthValue } from "../../../store/AuthContext"
import PostNew from "../PostNew"
import SignOut from "../SignOut"

const Menu = () => {
    const clickState = useContext(menuClick)
    const {clickMenu} = clickState
    const { currentUser, profile } = useAuthValue() 

  return (
      <div className={`${clickMenu ? "top-32 " : "-top-[30rem] "} transform duration-500 ease-out absolute bg-DarkBlueGray w-80 h-[25.5rem] z-50 inset-0  mx-auto rounded-2xl lg:hidden`}>
      <div className=" w-64 mx-auto">
      { profile === "account" ? (
          <UserAccount />
        ): profile === "profile" && (
          <>
            <h1 className=" text-center text-2xl mt-1">{currentUser?.displayName}</h1>
            <PostNew />
          </>
        ) 
      }
        <div className=" mt-8">
            <Categories />
        </div>
        {
          profile === "profile" && (
            <SignOut />
          )
        }
      </div>
      <Bubbles />
    </div>
  )
}

export default Menu
