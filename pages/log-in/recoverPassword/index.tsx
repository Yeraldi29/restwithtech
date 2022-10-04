import { useEffect, useState } from "react"
import { useFormContextS_L } from "../../../store/FormContextS_L"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import Head from "next/head"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NextPageWithLayout } from "../../_app"
import { useTranslation } from "next-i18next"
import InputEmail from "../../../components/forms/InputEmail"
import useValidation from "../../../Hooks/useValidation"
import ButtonForms from "../../../components/forms/ButtonForms"
import Router from "next/router"
import { useAuthValue } from "../../../store/AuthContext"
import Link from "next/link"

const RecoverPassword: NextPageWithLayout = () => {
  const { formValues, formErrors, handleFormErrors, handleFormValues} = useFormContextS_L()
  const { t } = useTranslation("signIn_logIn")
  const {currentUser} = useAuthValue()

  const [submit, setSubmit] = useState(false)
  const [animation, setAnimation] = useState(false)
  const [validation, setValidation] = useState(false)
  const [validationBubbles, setValidationBubbles ] = useState(false)
  const [resendEmail, setResendEmail] = useState(false)
  const [timeActive, setTimeActive] = useState(false)
  const [time, setTime] = useState(60)
  const {errors, setValues, values, other, setOther, messageErrorFirebase} = useValidation()

  useEffect(()=>{
    setValues(formValues)
    handleFormErrors(errors)
  },[formValues, values, other])

  useEffect(()=>{
     if(formErrors.email ===  ""){
       setValidation(true)
     }else if(formErrors.password === ""){
       setValidation(true)
     }
     else{
       setValidation(false)
     }

     if(formErrors.email ===  "" && messageErrorFirebase === "") {
      setValidationBubbles(true)
     }else if(formErrors.password ===  "" && messageErrorFirebase === ""){
      setValidationBubbles(true)
     }else{
      setValidationBubbles(false)
     }

   },[formErrors, messageErrorFirebase])

   useEffect(()=>{
    let interval: NodeJS.Timeout | undefined

    if(timeActive && time !== 0){
      interval = setInterval(()=>{
        setTime(time => time - 1)
      },1000)
    }else if( time === 0){
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }

    return () => clearInterval(interval)
   },[timeActive, time])

   const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
     const {value, name} = e.target
     handleFormValues(name, value)
     setOther("")
     setSubmit(false)
   }

   const handleSendRecoverPassword = (e:React.FormEvent<HTMLFormElement>) => {
     e.preventDefault()
     setValues(formValues)
     handleFormErrors(errors)

     setSubmit(true)

     const auth = getAuth()

     if(validation){
      console.log("🚀 ~ file: index.tsx ~ line 72 ~ handleSendRecoverPassword ~ validation", validation)
      
       sendPasswordResetEmail(auth,formValues.email).then(() => {
        setResendEmail(true)
        setTimeActive(true)
       }).catch(err => {
        setOther(err.message)
        handleFormErrors(errors)
        console.log("🚀 ~ file: index.tsx ~ line 77 ~ sendPasswordResetEmail ~ err.message", err.message)
       })
     }
   }

   const handleSetSubmit = () => {
     setSubmit(false)
   }

  return (
    <>
      <Head>
        <title>{t("recoverPassword.title")}</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <div className=" bg-DarkBlueGray flex flex-col items-center space-y-5 mx-auto w-[21rem] -rotate-1 rounded-2xl py-10 px-6 lg:px-10 mt-24  md:w-[30rem] xl:mt-36">
        <h1 className="text-center text-xl">{t("recoverPassword.title")}</h1>
        
        <p className="text-center">
          <strong>
            {t("recoverPassword.messageEmail")}
          </strong>
        </p>
        <form className="flex flex-col w-full " onSubmit={handleSendRecoverPassword}>
          <InputEmail formErrorsEmail={formErrors.email} submit={submit} formValuesEmail={formValues.email} handleChange={handleChange} messageErrorFirebase={messageErrorFirebase} handleSetSubmit={handleSetSubmit} />

          {resendEmail ? (
            <>
             <button className={`${animation && " animate-wiggle "} bg-Lavender-Blue rounded-xl mt-6 mx-auto p-2 -rotate-12 text-Blue-Gray lg:hover:opacity-50 active:bg-white cursor-pointer`}
             onClick={()=>{
             setAnimation(true)
            const auth = getAuth()
            sendPasswordResetEmail(auth,formValues.email).then(() => {
              setResendEmail(true)
              setTimeActive(true)
             }).catch(err => {
              setOther(err.message)
              handleFormErrors(errors)
              console.log("🚀 ~ file: index.tsx ~ line 77 ~ sendPasswordResetEmail ~ err.message", err.message)
             })
             }}
             onAnimationEnd={()=>{setAnimation(false)}}
              disabled={timeActive}
             >
               <p>
                {t("recoverPassword.resend")}
                <span className={`${timeActive && "ml-2 text-white  bg-DarkBlueGray rounded-md p-1"}`}>{timeActive && time}</span>
               </p>
             </button>

             <Link href={"/log-in"} locale={Router.locale}>
              <div className="mt-6 mx-auto border p-2 cursor-pointer rounded-lg lg:hover:opacity-50">
                <h3>{t("recoverPassword.comeBack")}</h3>
              </div>
             </Link>
            </>
          ) : (
          <ButtonForms validation={validationBubbles} title={t("recoverPassword.send")}  submit={submit}/>
          )
          }
        </form>
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => {
  return {
    props: {...await serverSideTranslations(locale, ['signIn_logIn','header']),}
  }
}

RecoverPassword.getLayout = (page) => page

export default RecoverPassword