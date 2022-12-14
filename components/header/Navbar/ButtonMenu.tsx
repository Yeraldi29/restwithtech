import {useContext} from "react"
import { menuClick } from "../../../store/store"

const ButtonMenu = () => {
    const clickState = useContext(menuClick)
    const {clickMenu} = clickState

  return (
    <button className={`${clickMenu && " bg-Lavender-Blue"} w-14 h-14 -rotate-12 border rounded-2xl flex flex-col items-center justify-center lg:hidden`} 
    onClick={() => clickState.handleClick(!clickMenu)}>
      <div className={`divLine bg-white  ${clickMenu && " rotate-45 translate-y-3 border-red-400 bg-red-400"}`} ></div>
      <div className={`divLine bg-white  ${clickMenu && " opacity-0"}`} ></div>
      <div className={`divLine bg-white  ${clickMenu && " -rotate-45 -translate-y-4 border-red-400 bg-red-400"}`} ></div>
    </button>
  )
}

export default ButtonMenu
