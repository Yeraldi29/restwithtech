import Link from "next/link"
import {AiOutlineGithub, AiOutlineGoogle} from "react-icons/ai"
import FormInputs from "./FormInputs"
import { useState } from "react"
import { useRouter } from "next/router"

interface PropsInput {
    title: string
    email: string
    password: string
    tryAccount: string
    account: string
    change: string
    forgotPassword?: string
    remember?:string
}

const FormContainer = ({title,email,password,tryAccount,account,change,forgotPassword,remember}:PropsInput) => {
    const [animation, setAnimation] = useState({
        animation:false,
        icon:0
    })
  const router = useRouter()
  const path = router.asPath
    
  return (
    <div className=" bg-DarkBlueGray border -rotate-1 mx-auto mt-2 rounded-2xl w-[21rem] shadow-2xl py-10 pb-16 px-6">
    <h2 className="text-center text-2xl mb-4">{title.toUpperCase()}</h2>
    <FormInputs email={email} password={password} title={title} remember={remember}/>

    <p className=" text-sm text-right mb-4 opacity-90 cursor-pointer">{forgotPassword}</p>
    
    <p className="text-center mt-2">{tryAccount}</p>
    <hr className="border-2 bg-white mb-4 rounded-sm"/>
    <div className="flex items-center justify-center space-x-5">
        <div className={`${(animation.animation && animation.icon === 1) && " animate-wiggle "} w-10 h-10 rounded-xl -rotate-12 border-2 bg-Lavender-Blue flex items-center justify-center border-black active:bg-white group cursor-pointer`}
        onClick={()=>setAnimation({animation:true,icon:1})} onAnimationEnd={()=>setAnimation({animation:false,icon:0})} >
            <AiOutlineGithub className=" w-8 h-8 text-black lg:group-hover:scale-110 rotateItem rotate-0 "></AiOutlineGithub>
        </div>
        <div className={`${(animation.animation && animation.icon === 2) && " animate-wiggle "} w-10 h-10 rounded-xl -rotate-12 border-2 border-red-500 bg-Lavender-Blue flex items-center justify-center active:bg-white group cursor-pointer`}
        onClick={()=>setAnimation({animation:true,icon:2})} onAnimationEnd={()=>setAnimation({animation:false,icon:0})} >
            <AiOutlineGoogle className=" w-8 h-8 text-red-500 lg:group-hover:scale-110 rotateItem rotate-0 "></AiOutlineGoogle>
        </div>
    </div>
    <div className="flex justify-center items-center space-x-1 mt-5">
        <p>{account}</p>
        <Link href={`${ path === "/log-in" ? "/sign-in" : "/log-in"}`} locale={router.locale}>
            <div className={`${(animation.animation && animation.icon === 3) && " animate-wiggle "} bg-Lavender-Blue rounded-xl text-DarkBlueGray font-semibold p-2 border -rotate-12 active:bg-white hover:opacity-50 cursor-pointer`}
            onClick={()=>setAnimation({animation:true,icon:3})} onAnimationEnd={()=>setAnimation({animation:false,icon:0})}>
                <p >{change}</p>
        </div>
        </Link>
    </div>
</div>
  )
}

export default FormContainer
