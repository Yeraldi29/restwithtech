import { useContext } from "react"
import { BiBell } from "react-icons/bi"
import { menuClick } from "../../../store/store"

const Notifications = () => {

    const clickState = useContext(menuClick)
    const { clickBell, handleClick, handleClickBell, handleClickProfile } = clickState

    const handleClickNotification = () => {
        handleClick(false)
        handleClickBell(!clickBell)
        handleClickProfile(false)
    }

  return (
    <>
    <div className="relative" onClick={handleClickNotification} >
        <BiBell className=" w-6 h-6 xl:w-7 xl:h-7 mx-auto -rotate-12 lg:hover:rotateItem cursor-pointer " />      
        <div className="absolute bottom-0 left-4 w-2 h-2 xl:w-[10px] xl:h-[10px] rounded-full bg-red-500 animate-pulse" ></div>
        {clickBell && (
        <div>
            <div className={`${ (clickBell) && " animate-expand "}  absolute w-6 h-6 bg-DarkBlueGray rounded-full border border-Blue-Gray -bottom-14 left-0 `} ></div>
            <div className={`${(clickBell) && " animate-expand"}  absolute w-5 h-5 bg-DarkBlueGray rounded-full border border-Blue-Gray -bottom-8 -left-3  `}></div>
            <div className={`${(clickBell) && " animate-expand"}  absolute w-4 h-4 bg-DarkBlueGray rounded-full border border-Blue-Gray -bottom-4 left-1  `}></div>
        </div>
        )}
    </div>
    <div className={`absolute ${clickBell ? "top-[6.7rem] right-2 xl:top-[7.5rem]" : "-top-[30rem] right-0"} transform duration-500 ease-out bg-DarkBlueGray border-4 border-Blue-Gray w-[22rem] h-[26.5rem] z-50 rounded-2xl
    overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-transparent scrollbar-thumb-BabyBlueEyes`} >
        
    </div>
    </>
  )
}

export default Notifications