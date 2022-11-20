import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Input = ({placeholder}:{placeholder:string}) => {
  const [click, setClick] = useState(false)
  
  return (
    <div className="relative cursor-pointer">
        <div className={`${click && "animate-wiggle text-Blue-Gray"} flex items-center w-11 h-11 xl:w-14 xl:h-14 bg-gainsboro border border-Lavender-Gray rounded-2xl -rotate-12 lg:hover:rotateItem`} 
        onClick={()=>setClick(true)} onAnimationEnd={()=>setClick(false)}>
        <BiSearch  className=" w-8 h-8 xl:w-9 xl:h-9 mx-auto -rotate-12"/>
        </div>
        {/* <form>
        <input className="hidden lg:block w-28 rounded-2xl pl-6 border border-gray-500 bg-gainsboro placeholder:text-dim-gray focus:text-gray-light focus:outline-none focus:ring-2 focus:ring-gray-light focus:border-none focus:border-inherit  focus:w-full duration-500 hover:ring-2 hover:ring-gray-light" type="text" 
        placeholder={placeholder}/> 
        </form> */}
    </div>
  )
}

export default Input