import { useTranslation } from "next-i18next"
import { useEffect, useState, useRef } from "react"
import Router from "next/router"
import useValidation from "../../Hooks/useValidation"
import UserActions from "../functions/UserActions"
import { useAuthValue } from "../../store/AuthContext"
import ButtonForms from "./ButtonForms"
import { useFormContextS_L } from "../../store/FormContextS_L"
import InputEmail from "./InputEmail"
import InputPassword from "./InputPassword"

const FormInputsS_L = ({title}:{title: string}) => {
    const [submit, setSubmit] = useState(false)
    const [validation, setValidation] = useState(false)
    const [validationBubbles, setValidationBubbles ] = useState(false)

    const inputPassword = useRef<HTMLInputElement | null>(null)
    const { formValues, formErrors, handleFormValues, handleFormErrors} = useFormContextS_L()
    
    const {errors, setValues, values, other, setOther, messageErrorFirebase} = useValidation()
    
    const { t } = useTranslation("signIn_logIn")
    const {handleTimeActive} = useAuthValue()
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        handleFormValues(name, value)
        setOther("")
        setSubmit(false)
    }

    useEffect(()=>{
        setValues(formValues)
        handleFormErrors(errors)
    },[formValues, values, other])

    useEffect(()=>{
        if((formErrors.email ===  "") && (formErrors.password === "") ){
            setValidation(true)
        }else{
          setValidation(false)
        }
     
       if(((formErrors.email ===  "") && (formErrors.password === "")) && messageErrorFirebase === "") {
        setValidationBubbles(true)
       }else if(formErrors.password ===  "" && messageErrorFirebase === ""){
        setValidationBubbles(true)
       }else{
        setValidationBubbles(false)
       }

    },[formErrors, messageErrorFirebase])

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setValues(formValues)
        handleFormErrors(errors)

        setSubmit(true)

        const handleOther = (err:string|boolean) => {
            setOther(err)
            handleFormErrors(errors)
        }
        
        UserActions({validation,formValues,handleOther,handleTimeActive,title, Router, t,handleFormValues})
    }

    const handleSetSubmit = () => {
        setSubmit(false)
    }

  return (
    <form className=" flex flex-col " onSubmit={handleSubmit} autoSave="on" >
        <InputEmail formErrorsEmail={formErrors.email} submit={submit} formValuesEmail={formValues.email} handleChange={handleChange} inputPassword={inputPassword} messageErrorFirebase={messageErrorFirebase} handleSetSubmit={handleSetSubmit}/>
        <InputPassword formErrorsPassword={formErrors.password} submit={submit} formValuesPassword={formValues.password} handleChange={handleChange} inputPassword={inputPassword} handleSetSubmit={handleSetSubmit} />

         <ButtonForms validation={validationBubbles} title={title} submit={submit} />
     </form>
  )
}

export default FormInputsS_L