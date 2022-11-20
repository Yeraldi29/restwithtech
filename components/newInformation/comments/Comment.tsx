import { BiLike, BiMessageDetail } from "react-icons/bi"
import { BsReply } from "react-icons/bs"
import { useCommentContext } from "../../../store/store"

const Comment = () => {
  const { contentSlate } = useCommentContext()
    
  return (
    <div >
        <div className="relative flex items-center space-x-2 mt-3 sm:ml-3 md:ml-24 lg:ml-0">
          <div >
            <div className="imageProfile bg-black"></div>
          </div>
          <div>
            <div className="w-fit p-2 border-4 border-b-0 border-Blue-Gray bg-DarkBlueGray rounded-xl  ">
              <h3 className="text-lg md:text-xl">Lorem Ipsum</h3>
              <h6 className=" text-sm md:text-base text-BabyBlueEyes">18/11/2022</h6>
            </div>
            <div className="bg-Lavender-Blue/40 text-BlueDarker rounded-xl  p-2 border-4 border-Blue-Gray md:text-lg">
                {contentSlate}
            </div>
            <div className="flex items-center justify-between p-2 bg-DarkBlueGray rounded-xl border-4 border-Blue-Gray border-t-0 ">
              <div className="flex items-center space-x-1">
                <BiLike className="w-7 h-7 -rotate-12"/>
                <h3 className="-rotate-1"></h3>
              </div>
              <div className="flex items-center space-x-1">
                <BiMessageDetail className="w-7 h-7 rotate-12"/>
                <h3 className="-rotate-1"></h3>
              </div>
              <div className="flex items-center space-x-1">
                <BsReply className="w-7 h-7 -rotate-12"/>
                <h3 className="rotate-1"></h3>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Comment