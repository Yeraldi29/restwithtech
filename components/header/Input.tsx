import { BiSearch } from "react-icons/bi";

const Input = ({placeholder}:{placeholder:string}) => {
  return (
    <div className="relative">
        <div className="absolute inset-y-0 flex items-center pl-1">
        <BiSearch  className="w-5 h-5 text-gray-light"/>
        </div>
        <form>
        <input className=" w-28 rounded-2xl pl-6 bg-gainsboro  placeholder:text-dim-gray focus:outline-none focus:ring-2 focus:ring-gray-light focus:border-none" type="text" 
        placeholder={placeholder}/> 
        </form>
    </div>
  )
}

export default Input