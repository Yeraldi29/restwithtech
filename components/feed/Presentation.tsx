import Image from "next/image"

const Presentation = ({message,presentationImage,title}: {message:string,presentationImage: string,title:string}) => {
  return (
    <div className="relative overflow-hidden w-full h-[22rem] bg-DarkBlueGray border-4 border-DarkBlueGray mt-4 rounded-xl -rotate-1 sm:h-[27rem] md:h-[30rem] lg:h-[32rem] md:col-span-2 lg:row-span-2">
        <div className="h-full w-full flex flex-col justify-between py-2">
            <div className="relative z-20 mx-auto bg-Lavender-Blue/80 rounded-xl">
                <h1 className="text-center text-md p-2 sm:text-lg md:text-xl text-Blue-Gray font-bold">{title}</h1>
            </div>
            <div className="relative z-20 bg-DarkBlueGray/50 mx-2 sm:mx-20 md:mr-32 md:ml-2 rounded-xl">
                <p className="text-center text-md p-2 sm:text-lg md:text-xl md:text-left">{message}</p>
            </div>
        </div>
        <Image src={presentationImage} alt="" fill={true} priority={true}/>
    </div>
  )
}

export default Presentation