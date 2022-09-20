import Head from "next/head"
import Router from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextPageWithLayout } from "../../_app"
import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import { useAuthValue } from "../../AuthContext"
import { auth } from "../../../firebase"
import { sendEmailVerification} from "firebase/auth"

const Verification: NextPageWithLayout = () => {
   const {t} = useTranslation("signIn_logIn")
   const [animation, setAnimation] = useState(false)
   const [time, setTime] = useState(60)

   const {currentUser, timeActive, handleTimeActive} = useAuthValue()

   const resedEmailVerification = () => {
    
    if(auth.currentUser){
      sendEmailVerification(auth.currentUser).then( () => {
        handleTimeActive(true)
      }).catch(err => {
        alert(err.message)
      })
    }

   }

   useEffect(()=>{
    let interval: NodeJS.Timeout | undefined

    if(timeActive && time !== 0){
      interval = setInterval(()=>{
        setTime(time => time - 1)
      },1000)
    }else if( time === 0){
      handleTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    
    return () => clearInterval(interval)
   },[timeActive, time])

   useEffect(()=>{
    const interval = setInterval(()=>{
      currentUser?.reload().then(()=>{
        if(currentUser?.emailVerified){
          clearInterval(interval)
          Router.push("/log-in")
        }
      }).catch(err=>{
        alert(err.message)
      })
    },1000)
   },[currentUser])
   
  return (
    <>
    <Head>
      <title>{t("verification.titlePage")}</title>
      <link rel="icon" href="/icon.png" />
    </Head>

    <div className=" bg-DarkBlueGray flex flex-col items-center space-y-5 mx-auto w-[21rem] -rotate-1 rounded-2xl py-10 px-6 mt-24  md:w-[30rem] xl:mt-36">
      <h1 className=" text-xl text-center">{t("verification.title")}</h1>
      <p className="text-center">
        <strong>{t("verification.message")}</strong>
        <span className=" text-Lavender-Blue">{currentUser?.email}</span>
      </p>
      <p>{t("verification.suggestion")}</p>
      
      <button className={`${animation && " animate-wiggle "} bg-Lavender-Blue rounded-xl mt-6 p-2 -rotate-12 text-Blue-Gray lg:hover:opacity-50 active:bg-white cursor-pointer`} 
      onClick={()=>{
      setAnimation(true)
      resedEmailVerification()
      }}
      onAnimationEnd={()=>{setAnimation(false)}} 
      disabled={timeActive}
      >
        <p>{t("verification.resend")}<span className={`${timeActive && "ml-2 text-white  bg-DarkBlueGray rounded-md p-1"}`}>{timeActive && time}</span></p>
      </button>      
    </div>
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['signIn_logIn','header']),
  },
})

Verification.getLayout = (page) => page

export default Verification