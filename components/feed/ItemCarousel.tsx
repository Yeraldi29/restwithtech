import Link from "next/link"

const ItemCarousel = ({image,name,category, title}:itemProps) => {
  return (
    <>
    {
      image === "" ? (
        <div className="w-full h-full rounded-xl bg-white/40 blur-2xl"></div>
        ): (
        <div className=" flex flex-shrink-0 w-full justify-center cursor-pointer group"> 
          <Link href={`/${category}/${title}`} className="w-full snap-start">
            <picture className="w-full brightness-75 " >
              <img className="w-full h-full rounded-xl cursor-pointer " src={image} alt={name} />
            </picture>
            <div className="absolute w-full bottom-0 z-20 p-2 md:px-6">
              <div className="bg-DarkBlueGray/50 rounded-xl sm:mx-20 md:mr-32 md:ml-0">
                <h1 className="text-center text-md p-2 sm:text-lg md:text-xl md:text-left">
                  <strong>{title}</strong>
                </h1>
              </div>
            </div>
          </Link>
        </div>
      )
    }
  </>
  )
}

export default ItemCarousel