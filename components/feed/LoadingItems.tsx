
const LoadingItems = ({index}:{index:number}) => {
  return (
    <div className="h-full">
      <div className={`relative w-full h-96 md:h-[26rem] lg:h-[31rem] ${index % 2 === 0 ? "-rotate-1" : "even:rotate-1"} rounded-xl bg-Lavender-Blue/30 border-4 border-DarkBlueGray 
      shadow z-0 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:animate-[shimmer_1.5s_infinite]`}>
            <div className="relative overflow-hidden bg-Blue-Gray border-b-4 border-DarkBlueGray rounded-t-md ">
              <div className="relative z-20 w-full h-28 sm:h-40 rounded-t-md overflow-hidden ">
              </div>
            </div>
            <div className="flex items-center mt-2 mx-2 justify-between text-sm xl:text-base">
               <div className={`w-24 h-6 bg-Blue-Gray rounded-md overflow-hidden`}>
               </div>
               <div className="w-20 h-4 bg-Blue-Gray rounded-md overflow-hidden"></div>
            </div>
            <div className=" mx-2">
                <div className="relative w-full mt-4 sm:mt-8 h-9 bg-Blue-Gray rounded-xl" ></div>
                <div className="relative w-full mt-2 sm:mt-4 h-9 bg-Blue-Gray rounded-xl" ></div>
                <div className="relative w-full mt-2 sm:mt-4 h-9 bg-Blue-Gray rounded-xl" ></div>
                <div className="relative w-full mt-2 sm:mt-4 h-9 bg-Blue-Gray rounded-xl" ></div>
            </div>
      </div>
    </div>
  )
}

export default LoadingItems