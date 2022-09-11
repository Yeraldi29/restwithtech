import {useContext} from "react"
import { menuClick } from "../../../pages/store"
import Categories from "./Categories"
import Bubbles from "./Bubbles"
import UserAccount from "./UserAccount"

const Menu = () => {
    const clickState = useContext(menuClick)
    const {clickMenu} = clickState

  return (
      <div className={`${clickMenu ? "top-32 " : "-top-[30rem] "} transform duration-500 ease-out absolute bg-DarkBlueGray w-80 h-96 z-50 inset-0  mx-auto rounded-2xl lg:hidden`}>
      <div className=" w-64 mx-auto">
        <UserAccount />
        <div className=" mt-8">
            <Categories />
        </div>
      </div>
      <Bubbles />
    </div>
  )
}

export default Menu
