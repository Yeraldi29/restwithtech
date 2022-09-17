import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useState } from "react"

const useValidation = () => {
    const path = useRouter().asPath
    const [values, setValues] = useState({email: "",password: ""})
    const [other, setOther] = useState("")
    const { t } = useTranslation("signIn_logIn")
    
    const errors = {email:"", password: ""}
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{4,12}$/;
    const regexe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const {email,password} = values
    let messageErrorFirebase= "" 
    
    if(email===""){
        errors.email = t("errors.email.empty")
    }else if(!regexe.test(email) && path !== "/log-in"){
        errors.email = t("errors.email.valid")
    }
    
    if(password===""){
        errors.password = t("errors.password.empty")
    }else if(!regexp.test(password)  && path !== "/log-in" ){
        errors.password = t("errors.password.valid")
    }  

    if(other === "Firebase: Error (auth/email-already-in-use)."){
        messageErrorFirebase = t("errors.email.exists")
    }else if(other === "Firebase: Error (auth/network-request-failed)."){
        messageErrorFirebase = t("errors.internet")
    }

    return {errors, setValues, values, other, setOther, messageErrorFirebase}
}

export default useValidation
