import Image from 'next/image'

const Logo = () => {
  return (
    <>
      <div className='relative w-16 h-16 md:hidden -rotate-12 '>
         <Image src={"/icon.png"} alt="logo" layout='fill' priority={true} />
        </div>
        <div className="relative hidden md:block w-48 h-14 cursor-pointer lg:hover:scale-105 lg:hover:rotate-2 transform duration-200 ease-in">
          <Image src="/logo_size.png" alt="logo image"  layout='fill'  objectFit='contain' priority={true}/>
     </div>
    </>
  )
}

export default Logo