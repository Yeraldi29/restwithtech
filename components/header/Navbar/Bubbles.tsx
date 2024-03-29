import { useContext } from "react"
import { useAuthValue } from "../../../store/AuthContext"
import { menuClick } from "../../../store/store"

const Bubbles = ({click}:{click?:boolean}) => {
    const clickState = useContext(menuClick)
    const {clickMenu} = clickState
    const { profile } = useAuthValue() 

  return (
    <div className="absolute inset-y-0">
        <div className={`${ (click||clickMenu) && " animate-expand "}  absolute w-6 h-6 bg-DarkBlueGray rounded-full border border-Blue-Gray -top-[1.9rem] left-28 ${profile === "account" && "md:left-40"} lg:inset-0  lg:-top-8 lg:-left-5`} ></div>
        <div className={`${(click||clickMenu) && " animate-expand"}  absolute w-5 h-5 bg-DarkBlueGray rounded-full border border-Blue-Gray -top-[3.2rem] left-32 ${profile === "account" && "md:left-44"} lg:inset-0  lg:-top-11 lg:left-1 `}></div>
        <div className={`${(click||clickMenu) && " animate-expand"}  absolute w-4 h-4 bg-DarkBlueGray rounded-full border border-Blue-Gray -top-[4.2rem] ${profile === "profile" ? "left-28 md:left-36 ":"left-36 md:left-48"}  lg:inset-0 lg:-top-14 lg:left-6`}></div>
    </div>
  )
}

export default Bubbles
