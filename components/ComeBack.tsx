import Link from "next/link"
import { BiArrowBack } from "react-icons/bi"

const HeaderTwo = () => {
    return (
    <Link href="/">
      <div className=" m-4 ml-6 lg:m-6 w-12 h-12 bg-Lavender-Blue rounded-2xl -rotate-45 border shadow-inner drop-shadow-md active:bg-white flex items-center justify-center cursor-pointer hover:opacity-90">
              <BiArrowBack className="w-10 h-10 text-DarkBlueGray rotate-45"/>
      </div>
    </Link>
  )
}

export default HeaderTwo
