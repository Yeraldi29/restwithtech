import { useContext } from "react"
import { menuClick } from "../../../pages/store"

const Bubbles = ({click}:{click?:boolean}) => {
    const clickState = useContext(menuClick)
    const {clickMenu} = clickState

  return (
    <div className="absolute inset-y-0">
        <div className={`${ (click||clickMenu) && " animate-expand "}  absolute w-6 h-6 bg-DarkBlueGray rounded-full -top-7 left-36 lg:inset-0  lg:-top-7 lg:-left-5`} ></div>
        <div className={`${(click||clickMenu) && " animate-expand"}  absolute w-5 h-5 bg-DarkBlueGray rounded-full -top-12 left-40 lg:inset-0  lg:-top-9 lg:left-1 `}></div>
        <div className={`${(click||clickMenu) && " animate-expand"}  absolute w-4 h-4 bg-DarkBlueGray rounded-full -top-[3.8rem] left-[9.2rem] md:left-44 lg:inset-0 lg:-top-12 lg:left-6`}></div>
    </div>
  )
}

export default Bubbles
