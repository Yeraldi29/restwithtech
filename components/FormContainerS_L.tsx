import Link from "next/link"
import {AiOutlineGithub, AiOutlineGoogle} from "react-icons/ai"
import FormInputsS_L from "./forms/FormInputsS_L"
import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Language from "./header/Language"
import useGithubSession from "../Hooks/firebase/useGithubSession"
import BubblesLoading from "./loading/BubblesLoading"
import useGoogleSession from "../Hooks/firebase/useGoogleSession"

interface PropsInput {
    title: string
    tryAccount: string
    account: string
    change: string
    option: string
    forgotPassword?: string
}

const FormContainerS_L = ({ title, tryAccount, account, change, option, forgotPassword }:PropsInput) => {
    const [animation, setAnimation] = useState({
        animation:false,
        icon:0
    })
    const { github, isPending,error } = useGithubSession()
    const { google, isPending2, error2 } = useGoogleSession()

    const handleGithub = () => {
        setAnimation({animation:true,icon:1})
        github()
    }

    const handleGoogle = () => {
        setAnimation({animation:false,icon:0})
        google()
    }

  return (
    <div className=" relative bg-DarkBlueGray border-4 border-Blue-Gray -rotate-1 mx-auto mt-2 rounded-2xl w-[21.5rem] shadow-2xl py-10 px-6 sm:w-96 sm:mt-6 sm:px-8 xl:mt-16">
    <div className=" absolute inset-0 left-4 top-4">
        <Language />
    </div>
    
    <div className="flex items-center justify-center mb-4">
        <Link href={"/"}>
            <Image src={"/icon.png"} className=" -rotate-12 cursor-pointer" height={60} width={60} alt=""/>
        </Link>
        <h2 className="text-center text-2xl ">{title.toUpperCase()}</h2>
    </div>
    <FormInputsS_L title={title}/>

    <Link href={"/log-in/recoverPassword"} locale={useRouter().locale}>
        <p className=" text-sm text-right mb-4 opacity-90 cursor-pointer lg:hover:opacity-50">{forgotPassword}</p>
    </Link>
    
    <p className="text-center mt-2">{tryAccount}</p>
    <hr className="border-2 border-BlueDarker"/>
    <div className="flex items-center justify-center space-x-5 my-3">
        <div className={`${(animation.animation && animation.icon === 1) && " animate-wiggle "} w-10 h-10 rounded-xl -rotate-12 border-2 bg-Lavender-Blue flex items-center justify-center border-black active:bg-white group cursor-pointer`}
        onClick={handleGithub} 
        onAnimationEnd={()=>setAnimation({animation:false,icon:0})} >
            <AiOutlineGithub className=" w-8 h-8 text-black lg:group-hover:scale-110 rotateItem rotate-0 ">
            </AiOutlineGithub>
        </div>
        <div className={`${(animation.animation && animation.icon === 2) && " animate-wiggle "} w-10 h-10 rounded-xl rotate-12 border-2 border-red-500 bg-Lavender-Blue flex items-center justify-center active:bg-white group cursor-pointer`}
        onClick={()=>setAnimation({animation:true,icon:2})}
        onAnimationEnd={handleGoogle} >
            <AiOutlineGoogle className=" w-8 h-8 text-red-500 lg:group-hover:scale-110 rotateItem rotate-0 ">
            </AiOutlineGoogle>
        {
            (isPending || isPending2) && (
                <div className="relative">
                    <BubblesLoading validation={true} submit={true}/>
                </div>
            )
        }
        </div>
    </div>
    {
        error !== "" ? (
            <p className="text-red-300 -mt-4 rotate-1 text-center py-4">
                <small>
                    {error}
                </small>
            </p>
            ) : error2 !== "" && (
            <p className="text-red-300 -mt-4 rotate-1 text-center py-4">
                <small>
                    {error2}
                </small>
            </p>
            )
    }
    <div className="flex justify-center items-center space-x-3">
        <p>{account}</p>
        <Link href={`/${option}`} >
            <div className={`${(animation.animation && animation.icon === 3) && " animate-wiggle "} bg-Lavender-Blue rounded-xl text-DarkBlueGray border-4 border-Blue-Gray font-semibold p-2 -rotate-12 active:bg-white hover:opacity-50 cursor-pointer`}
            onClick={()=>setAnimation({animation:true,icon:3})} onAnimationEnd={()=>setAnimation({animation:false,icon:0})}>
                <p >{change}</p>
        </div>
        </Link>
    </div>
</div>
  )
}

export default FormContainerS_L