import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <>
    <Link href="/" className='md:hidden'>
      <div className='relative w-16 h-16 -rotate-12'>
       <Image src="/icon.png" alt="logo" fill sizes="(max-width:2000px)" />
      </div>
    </Link>
    <Link href="/" className='hidden md:block'>
     <div className="relative w-44 -ml-4 h-14  cursor-pointer lg:hover:scale-105 lg:hover:rotate-2 transform duration-200 ease-in">
        <Image className='object-contain' src="/logo_size.png" alt="logo image" fill sizes="(max-width:2000px)" />
     </div>
    </Link>
    </>
  )
}

export default Logo