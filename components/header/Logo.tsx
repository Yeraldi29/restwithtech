import Image from 'next/image'

const Logo = () => {
  return (
    <>
      <div className='relative w-14 h-14 lg:hidden'>
         <Image src={"/icon.png"} alt="logo" layout='fill' />
        </div>
        <div className="relative hidden lg:block w-48 h-14 cursor-pointer hover:scale-105 transform duration-200 ease-in">
          <Image src="/logo_size.png" alt="logo image"  layout='fill'  objectFit='contain'/>
     </div>
    </>
  )
}

export default Logo