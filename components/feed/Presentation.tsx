import Image from "next/image"
import { useRouter } from "next/router"

const Presentation = ({message,presentationImage,title}: {message:string,presentationImage: string,title:string}) => {
  const router = useRouter()

  return (
    <div className={`relative overflow-hidden w-full h-96 sm:h-[28rem] md:h-[32rem] xl:h-[36rem] bg-DarkBlueGray border-4 border-DarkBlueGray mt-4 rounded-xl -rotate-1 md:col-span-2`}>
        <div className="h-full w-full flex flex-col justify-between py-2">
            {
              router.asPath !== "/" && (
              <div className="relative z-20 mx-auto bg-Lavender-Blue/80 rounded-xl">
                <h1 className="text-center text-md p-2 sm:text-lg md:text-xl text-Blue-Gray font-bold">{title}</h1>
              </div>
              )
            }
            <div className={`${router.asPath !== "/" ? "relative" : "absolute bottom-4"} z-20 bg-DarkBlueGray/70 p-1 sm:p-2 mx-2 sm:mx-20 md:mr-32 md:ml-2 rounded-xl`}>
                <p className="text-center text-lg sm:text-2xl xl:text-3xl md:text-left">{message}</p>
            </div>
        </div>
        <Image src={presentationImage} alt="" fill={true} priority={true}/>
    </div>
  )
}

export default Presentation