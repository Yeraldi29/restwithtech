import { useState } from "react"
import { useTranslation } from "next-i18next"
import { BiHide, BiShow } from "react-icons/bi"

interface PropsInputPassword {
    formErrorsPassword: string
    submit: boolean
    formValuesPassword: string
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void
    inputPassword?: React.MutableRefObject<HTMLInputElement | null>
    handleSetSubmit: () => void
}

const InputPassword = ({formErrorsPassword, submit,formValuesPassword,handleChange,inputPassword,handleSetSubmit}: PropsInputPassword) => {
  const { t } = useTranslation("signIn_logIn")
  const [showPassword, setShowPassword] = useState({show:true, hide:false})

  return (
    <>
     <label>
             <p>{t("password")}</p>
         </label>
         <div className=" relative ">
             <input ref={inputPassword}
             className={` input ${(formErrorsPassword === t("errors.password.empty") && submit || formErrorsPassword  === t("errors.password.valid")) && " bg-red-300 focus:ring-red-500 "}`} 
             type={showPassword.hide ? "text" : "password" } name="password" value={formValuesPassword} onChange={handleChange} onClick={handleSetSubmit} />

             <BiShow className={` ${showPassword.hide ? "hidden ":" cursor-pointer w-8 h-8 text-DarkBlueGray absolute top-[0.85rem] right-1 "}`} 
             onClick={()=>setShowPassword({...showPassword,show:!showPassword.show, hide:!showPassword.hide})}/>
             <BiHide className={`${showPassword.show ? "hidden ":" cursor-pointer w-8 h-8 text-DarkBlueGray absolute top-[0.85rem] right-1 " }`}
             onClick={()=>setShowPassword({...showPassword,hide:!showPassword.hide, show:!showPassword.show})}/>
        </div>
        
         <p className={`${((formErrorsPassword === t("errors.password.empty") && !submit) ||
          formErrorsPassword === "") ? "hidden " : "text-red-300 -mt-4 rotate-1"}`}>
             <small>{formErrorsPassword}</small>
         </p>
    </>
  )
}

export default InputPassword
