
const ItemCarousel = ({image,alt}:{image:string, alt:string}) => {
  return (
    <>
    {
      image === "" ? (
        <div className="w-full h-96 bg-black rounded-xl"></div>
        ): (
           <div className=" flex flex-shrink-0 w-full justify-center"> 
            <picture className="snap-start w-full brightness-75" >
              <img className="w-full h-full rounded-xl" src={image} alt={alt} />
            </picture>
            <div className="absolute w-full bottom-0 z-20 p-2 md:p-6">
              <div className="bg-DarkBlueGray/50 rounded-xl mx-3 sm:mx-20 md:mr-32 md:ml-0">
                <h1 className="text-center text-md p-2 sm:text-lg md:text-xl md:text-left">
                  <strong>dui nam nisl et cubilia habitant venenatis commodo interdum nascetur, fermentum ultricies commodo interdum nascetur, fermentum ultricies.</strong>
                </h1>
              </div>
            </div>
           </div>
      )
    }
  </>
  )
}

export default ItemCarousel