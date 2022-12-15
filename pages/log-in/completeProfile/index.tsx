import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import ButtonForms from "../../../components/forms/ButtonForms"
import ChooseImageProfile from "../../../components/forms/ChooseImageProfile"
import InputUsername from "../../../components/forms/InputUsername"
import Language from "../../../components/header/Language"
import type { NextPageWithLayout } from "../../_app"
import { useState, useContext } from "react"
import { useAuthValue } from "../../../store/AuthContext"
import { updateProfile } from "firebase/auth"
import { profileImage } from "../../../store/store"
import Router from "next/router"
import { db } from "../../../firebase"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"

const CompleteProfile:NextPageWithLayout = () => {
  const { t } = useTranslation("signIn_logIn")
  const { currentUser, profile } = useAuthValue()
  const profileImg = useContext(profileImage)
  const { imageProfile } = profileImg

  const [userName, setUserName] = useState("")
  const [validation, setValidation] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmit(true)
    setError("")
    if(validation){
      if(currentUser){
        const queryDisplayName = query(collection(db, "users"), where("userName","==", userName)) 
        const {docs} = await getDocs(queryDisplayName)
        const {uid} = currentUser

        if(docs.length === 0){
          const docRef = doc(db, `users/${uid}`)
          await setDoc(docRef,{
              userName,
              uid,
              descriptionProfile:"",
              skill1:"",
              skill2:"",
              skill3:"",
              profession:""
          })
          updateProfile(currentUser, {
            displayName: userName,
            photoURL: imageProfile
          }).then(()=>{
            Router.push("/")
          }).catch(err => {
            setError(err.message)
            setSubmit(false)
            console.log("🚀 ~ file: index.tsx ~ line 39 ~ handleSubmit ~ err.message", err.message)
          })
        }else{
            setError(t("errors.userName"))
            setSubmit(false)
          }
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
  
  if( profile === "profile"){
    Router.push("/") 
  }

  return (
    <>
    <Head>
        <title>{t("CompleteProfile.title")}</title>
        <link rel="icon" href="/icon.png" />
    </Head>
    
    <div className=" relative bg-DarkBlueGray border-4 border-Blue-Gray -rotate-1 mx-auto mt-2 rounded-2xl w-[21.5rem] shadow-2xl py-10 px-6 sm:w-96 sm:mt-6 sm:px-8 xl:mt-16">
        <div className=" absolute inset-0 left-4 top-4 w-0 h-0">
        <Language />
        </div>
        <h2 className="text-center text-2xl my-4">{t("CompleteProfile.announced")}</h2>
        <h3 className="text-center text-base mb-4">{t("CompleteProfile.before")}</h3>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <InputUsername userName={userName} handleUserName={handleUsername} submit={submit} handleClick={handleClick} handleValidation={handleValidation} 
          handleChangeUserName={handleChangeUserName}/>
          <ChooseImageProfile submit={submit}  handleClick={handleClick}/>
          <small className={`${(error === t("errors.userName")) ? "rotate-1 text-red-300 -mt-3 text-center" : "hidden"}`}>{error}</small>
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