import { useState, useRef, useEffect } from "react"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { categoriesAnItem } from "../../arrays/feedImages/allCategories";
import ItemCarousel from "./ItemCarousel";

const Carousel = () => {
  const [categories, setCategories] = useState([{image:"",name:"",category:"",title:""}])
  const maxScrollWidth = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [disable, setDisable] = useState({prev:false,next:false})
  const [animation, setAnimation] = useState({left:false,right:false})
  const carousel = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    setCategories(categoriesAnItem)
  },[])

  useEffect(()=>{
     maxScrollWidth.current = carousel.current ? 
     carousel.current.offsetWidth * (categories.length - 1)
     : 0
  },[categories,carousel.current?.offsetWidth])

  useEffect(()=>{
    if(carousel !== null && carousel.current !== null){
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex
    }
    if(maxScrollWidth.current === 0){
      setDisable({...disable,prev:currentIndex <= 0})
    }else{
      if (carousel.current !== null) {
        setDisable({prev:currentIndex <= 0,next:carousel.current.offsetWidth * currentIndex  >= maxScrollWidth.current})
      }
    }
  },[currentIndex])
  
  const movePrev = () => {
    if ( currentIndex > 0 ) {
      setCurrentIndex(prev => prev - 1)
    }
    setAnimation({...animation,left:true})
  }
  
  const moveNext = () => {
    if(carousel.current !== null && carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current){
      setCurrentIndex(prev => prev + 1)
    }
    setAnimation({...animation,right:true})
  }
  
  return (
    <>
      <div className="relative overflow-hidden w-full h-[22rem] bg-gray-400 mt-4 rounded-xl -rotate-1 sm:h-[27rem] md:h-[30rem] lg:h-[32rem] md:col-span-2 lg:row-span-3">
      <div className="flex justify-between items-center absolute w-full h-full px-3  md:px-6">
        <button 
        className={`w-12 h-12 md:w-14 md:h-14 z-10 flex justify-center items-center rounded-lg -rotate-12 bg-Blue-Gray/70 disabled:opacity-0 disabled:transition disabled:duration-300 disabled:ease-in lg:hover:bg-DarkBlueGray group ${animation.left && "animate-wiggle"}`}
        onClick={movePrev}
        onAnimationEnd={()=>setAnimation({...animation,left:false})}
        disabled={disable.prev}
        >
          <BiLeftArrow className="w-10 h-10 md:w-12 md:h-12 lg:group-hover:text-Lavender-Blue" />
        </button>
        <button 
        className={`w-12 h-12 md:w-14 md:h-14 z-10 flex justify-center items-center rounded-lg rotate-12 bg-Blue-Gray/70 disabled:opacity-0 disabled:transition disabled:duration-300 disabled:ease-in lg:hover:bg-DarkBlueGray group ${animation.right && "animate-wiggle"}`}
        onClick={moveNext}
        onAnimationEnd={()=>setAnimation({...animation,right:false})}
        disabled={disable.next}
        >
        <BiRightArrow className="w-10 h-10 md:w-12 md:h-12 lg:group-hover:text-Lavender-Blue" />
        </button>
      </div>
      <div ref={carousel} className="relative flex gap-1 overflow-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x z-0 h-full">
        {
          categories.map((category) => (
            <ItemCarousel image={category.image} name={category.name} category={category.category} key={category.name} title={category.title}/>
        ))
        }
      </div>
      <div className="absolute z-20 top-2 md:top-3 flex justify-center w-full space-x-2">
        <div className={`rounded-lg -rotate-12 ${currentIndex === 0 ? "bg-DarkBlueGray w-7 h-7 md:w-9 md:h-9 animate-pulse":"bg-Blue-Gray/70 w-5 h-5 md:w-6 md:h-6"}`}></div>
        <div className={`rounded-lg rotate-12 ${currentIndex === 1 ? "bg-DarkBlueGray w-7 h-7 md:w-9 md:h-9 animate-pulse":"bg-Blue-Gray/70 w-5 h-5 md:w-6 md:h-6"}`}></div>
        <div className={`rounded-lg -rotate-12 ${currentIndex === 2 ? "bg-DarkBlueGray w-7 h-7 md:w-9 md:h-9 animate-pulse":"bg-Blue-Gray/70 w-5 h-5 md:w-6 md:h-6"}`}></div>
        <div className={`rounded-lg rotate-12 ${currentIndex === 3 ? "bg-DarkBlueGray w-7 h-7 md:w-9 md:h-9 animate-pulse":"bg-Blue-Gray/70 w-5 h-5 md:w-6 md:h-6"}`}></div>
        <div className={`rounded-lg -rotate-12 ${currentIndex === 4 ? "bg-DarkBlueGray w-7 h-7 md:w-9 md:h-9 animate-pulse":"bg-Blue-Gray/70 w-5 h-5 md:w-6 md:h-6"}`}></div>
      </div>
    </div>
    </>
  )
}



export default Carousel