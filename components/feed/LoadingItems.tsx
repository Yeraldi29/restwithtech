
const LoadingItems = ({index,first}:{index:number, first?: boolean}) => {
  return (
    <div className="h-full">
      <div className={`relative w-full h-96 md:h-[26rem] lg:h-[31rem] ${index % 2 === 0 ? "-rotate-1" : "even:rotate-1"} ${(index === 0 && first ) && "mt-4"} rounded-xl bg-Lavender-Blue/30 border-4 border-DarkBlueGray 
      shadow z-0 `}>
            <div className="relative overflow-hidden bg-Blue-Gray border-b-4 border-DarkBlueGray rounded-t-md skeletonAnimation">
              <div className="relative z-20 w-full h-28 sm:h-40 rounded-t-md overflow-hidden ">
              </div>
            </div>
            <div className="flex items-center mt-2 mx-2 justify-between text-sm xl:text-base">
               <div className={`w-24 h-6 bg-DarkBlueGray rounded-md overflow-hidden skeletonAnimation`}>
               </div>
               <div className="w-20 h-4 bg-Blue-Gray rounded-md overflow-hidden skeletonAnimation"></div>
            </div>
            <div className=" mx-2">
                <div className="relative w-full mt-4 sm:mt-8 h-9 bg-DarkBlueGray rounded-xl skeletonAnimation" ></div>
                <div className="relative w-full mt-2 sm:mt-4 h-9 bg-Blue-Gray rounded-xl skeletonAnimation" ></div>
                <div className="relative w-full mt-2 sm:mt-4 h-9 bg-DarkBlueGray rounded-xl skeletonAnimation" ></div>
                <div className="relative w-full mt-2 sm:mt-4 h-9 bg-Blue-Gray rounded-xl skeletonAnimation" ></div>
            </div>
      </div>
    </div>
  )
}

export default LoadingItems