import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import ButtonForms from "../../../components/forms/ButtonForms"
import ChooseImageProfile from "../../../components/forms/ChooseImageProfile"
import InputUsername from "../../../components/forms/InputUsername"
import Language from "../../../components/header/Language"
import type { NextPageWithLayout } from "../../_app"
import { useState, useContext } from "react"
import { useAuthValue } from "../../AuthContext"
import { updateProfile } from "firebase/auth"
import { profileImage } from "../../store"
import Router from "next/router"

const CompleteProfile:NextPageWithLayout = () => {
  const { t } = useTranslation("signIn_logIn")
  const { currentUser } = useAuthValue()
  const profileImg = useContext(profileImage)
  const { imageProfile } = profileImg
  
  const [userName, setUserName] = useState("")
  const [validation, setValidation] = useState(false)
  const [submit, setSubmit] = useState(false)

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmit(true)
    
    if(validation){
      if(currentUser){
        updateProfile(currentUser, {
          displayName: userName,
          photoURL: imageProfile
        }).then(()=>{
          Router.push("/")

        }).catch(err => {
          console.log("🚀 ~ file: index.tsx ~ line 39 ~ handleSubmit ~ err.message", err.message)
        })
      }
    }
  }

  const handleClick = () =>{
    setSubmit(false)
  }

  const handleValidation = (messageError: boolean) => {
    setValidation(messageError)
  } 

  const handleChangeUserName = () =>{
    setSubmit(false)
  }

  const handleUsername = (value:string) => {
    setUserName(value)
  }
  
  return (
    <>
    <Head>
        <title>{t("CompleteProfile.title")}</title>
        <link rel="icon" href="/icon.png" />
    </Head>
    
    <div className=" relative bg-DarkBlueGray border -rotate-1 mx-auto mt-2 rounded-2xl w-[21.5rem] shadow-2xl py-10 px-6 sm:w-96 sm:mt-6 sm:px-8 xl:mt-16">
        <div className=" absolute inset-0 left-4 top-4 w-0 h-0">
        <Language />
        </div>
        <h2 className="text-center text-2xl my-4">{t("CompleteProfile.announced")}</h2>
        <h3 className="text-center text-base mb-4">{t("CompleteProfile.before")}</h3>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <InputUsername userName={userName} handleUserName={handleUsername} submit={submit} handleClick={handleClick} handleValidation={handleValidation} 
          handleChangeUserName={handleChangeUserName}/>
          <ChooseImageProfile submit={submit}  handleClick={handleClick}/>
          <ButtonForms validation={validation} title={t("CompleteProfile.save")} submit={submit} />
        </form>
    </div>
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['signIn_logIn','header']),
  },
})

CompleteProfile.getLayout = (page) => page

export default CompleteProfile