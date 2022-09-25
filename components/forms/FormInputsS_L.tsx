import { useTranslation } from "next-i18next"
import { useEffect, useState, useRef } from "react"
import { BiHide, BiShow } from "react-icons/bi" 
import { Checkbox } from "@material-tailwind/react"
import Router from "next/router"
import useValidation from "../../Hooks/useValidation"
import UserActions from "../functions/UserActions"
import { useAuthValue } from "../../pages/AuthContext"
import ButtonForms from "./ButtonForms"

const initialValues = {
    email: "",
    password: ""
}

const FormInputsS_L = ({email, password, title, remember}:{email:string, password: string, title: string, remember?:string}) => {
    const [submit, setSubmit] = useState(false)
    const [validation, setValidation] = useState(false)
    const [showPassword, setShowPassword] = useState({show:true, hide:false})
    const inputPassword = useRef<HTMLInputElement | null>(null)
    
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErros] = useState(initialValues)
    
    const {errors, setValues, values, other, setOther, messageErrorFirebase} = useValidation()
    
    const { t } = useTranslation("signIn_logIn")
    const {handleTimeActive} = useAuthValue()
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        setFormValues({...formValues,[name]:value})
        setOther("")
        setSubmit(false)
    }

    useEffect(()=>{
        setValues(formValues)
        setFormErros(errors)
    },[formValues, values, other])

    useEffect(()=>{
        if(((formErrors.email ===  "") && (formErrors.password === "") && (messageErrorFirebase === ""))){
            setValidation(true)
        }else{
            setValidation(false)
        }
    },[formErrors, messageErrorFirebase])
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setValues(formValues)
        setFormErros(errors)
        setSubmit(true)

        const handleOther = (err:string|boolean) => {
            setOther(err)
            setFormErros(errors)
        }

        UserActions({validation,formValues,handleOther,handleTimeActive,title, Router, t})
    }

  return (
    <form className=" flex flex-col " onSubmit={handleSubmit} >
        <label>
            <p>{email}</p>
        </label>
            <input 
            className={` input ${(formErrors.email === t("errors.email.empty") && submit || formErrors.email === t("errors.email.valid")) && " bg-red-300 focus:ring-red-500 "}`}
            type="text" name="email" value={formValues.email} onChange={handleChange} onClick={()=> setSubmit(false)}
            onKeyDown={e => {
                if(formErrors.email === ""){
                    e.key === "Enter" && inputPassword.current?.focus()
                }
            }}/>

           <p className={`${((formErrors.email === t("errors.email.empty") && !submit) || formErrors.email === "") ? "hidden " : "text-red-300 -mt-4 rotate-1"}`}>
                <small>{formErrors.email}</small>
           </p>
           <p className={`${messageErrorFirebase === "" ? "hidden" : " text-red-300 -mt-4 rotate-1"}`}>
            <small>{messageErrorFirebase}</small>
           </p>

         <label>
             <p>{password}</p>
         </label>
         <div className=" relative ">
             <input ref={inputPassword}
             className={` input ${(formErrors.password === t("errors.password.empty") && submit || formErrors.password  === t("errors.password.valid")) && " bg-red-300 focus:ring-red-500 "}`} 
             type={showPassword.hide ? "text" : "password" } name="password" value={formValues.password} onChange={handleChange} onClick={()=> setSubmit(false)} />

             <BiShow className={` ${showPassword.hide ? "hidden ":" cursor-pointer w-8 h-8 text-DarkBlueGray absolute top-2 right-1 "}`} 
             onClick={()=>setShowPassword({...showPassword,show:!showPassword.show, hide:!showPassword.hide})}/>
             <BiHide className={`${showPassword.show ? "hidden ":" cursor-pointer w-8 h-8 text-DarkBlueGray absolute top-2 right-1 " }`}
             onClick={()=>setShowPassword({...showPassword,hide:!showPassword.hide, show:!showPassword.show})}/>
        </div>
        
         <p className={`${((formErrors.password === t("errors.password.empty") && !submit) ||
          formErrors.password === "") ? "hidden " : "text-red-300 -mt-4 rotate-1"}`}>
             <small>{formErrors.password}</small>
         </p>
     
         <div className={`relative flex items-center h-8 ${!remember && " hidden "}`}>
             <Checkbox className=" w-6 h-6 -rotate-12 text-Lavender-Blue focus:border-Lavender-Blue focus:ring-Lavender-Blue" color="pink"  defaultChecked />
             <p>{remember}</p>
         </div>
         
         <ButtonForms validation={validation} title={title} submit={submit} />
     </form>
  )
}

export default FormInputsS_L