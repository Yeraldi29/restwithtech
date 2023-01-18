import { useContext } from "react"
import Link from "next/link"
import { menuClick } from "../../../store/store"

const Category = ({text, count,path}:{text:string, count:number,path:string}) => {
  const clickState = useContext(menuClick)
  const { handleClick } = clickState
  
  return (
    <>
      <Link href={`/${path}`} onClick={()=>handleClick(false)} >
        <h2 className="flex items-center justify-center text-xl lg:text-center lg:text-sm xl:text-lg cursor-pointer lg:hover:scale-125 lg:hover:-rotate-12 lg:hover:text-DarkBlueGray lg:hover:font-extrabold transition duration-150 ease-in-out h-10 ">{text}</h2>
      </Link>
      {count !== 4 && <hr className="border bg-white lg:-rotate-45 lg:w-9 lg:mt-5 "/> }
    </>
  )
}

export default Category
