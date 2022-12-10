import { useTranslation } from "next-i18next"
import { useRef, useState } from "react"
import { BiBook, BiBookOpen } from "react-icons/bi"
import { useAuthValue } from "../../../../store/AuthContext"
import { startSerialize } from "../../../createContent/plugins/serialize"

interface FeedCommProps {
    username: string | null
    parent: number
    data: string
    replyUsername?: string
    dataFather?: string
}

const FeedComm = ({username, parent, replyUsername, dataFather, data}:FeedCommProps) => {
  const [ seeMore, setSeeMore ] = useState(false)
  const refData = useRef<HTMLDivElement | null>(null)

  const { currentUser } = useAuthValue()
  const { t } = useTranslation("newPost")
    
  return (
    <div className={`relative p-2 ${seeMore ? "h-auto pb-10" : "max-h-64 "} overflow-hidden bg-Lavender-Blue/40 text-BlueDarker rounded-xl border-4 ${username === currentUser?.displayName ? "border-DarkBlueGray" :"border-Blue-Gray "} md:text-lg xl:text-xl`}>
        <div ref={refData}>
          {
            parent > 0 && (
              <div className="w-full bg-BabyBlueEyes/60 p-1 mb-2 text-sm rounded-md border-2 border-DarkBlueGray" >
                <h4 className="text-base text-BlueDarker font-bold ">{replyUsername}</h4>
                <p>{dataFather} <strong> ...</strong></p> 
              </div>
            )
          }
          {startSerialize(JSON.parse(data))}
        </div>
        {refData.current && refData.current?.offsetHeight > 256 && (
           <div className={`absolute bottom-1 right-1 flex items-center space-x-1 p-1 rounded-md border-2 text-white cursor-pointer transform duration-200 ease-out 
           ${username === currentUser?.displayName ? "border-DarkBlueGray bg-Blue-Gray lg:hover:text-DarkBlueGray" :"border-Blue-Gray bg-DarkBlueGray"}`}
           onClick={()=> setSeeMore(!seeMore)}>
           {seeMore ? (<>
            <h5 className="md:text-lg xl:text-xl">{t("seeLess")}</h5>
            <BiBook className="w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9 rotate-12 text-BlueDarker"/>
           </>
           ) : (<>
            <h5 className="md:text-lg xl:text-xl">{t("seeMore")}</h5>
            <BiBookOpen className="w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9 -rotate-12"/>
            </>
           )}
         </div>
        )}
    </div>
  )
}

export default FeedComm
