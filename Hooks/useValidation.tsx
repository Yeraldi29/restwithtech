import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useState } from "react"

const useValidation = () => {
    const path = useRouter().asPath
    const [values, setValues] = useState({email: "",password: ""})
    const [other, setOther] = useState<string | boolean>("")
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

    switch(other){
        case ("Firebase: Error (auth/email-already-in-use)."):{
            messageErrorFirebase = t("errors.email.exists")
            break
        }
        case ("Firebase: Error (auth/network-request-failed)."):{
            messageErrorFirebase = t("errors.internet")
            break
        }
        case ("Firebase: Error (auth/wrong-password)."):{
            messageErrorFirebase = t("errors.password.wrong")
            break
        }
        case (false):{
            messageErrorFirebase = t("errors.emailVerification")
            break
        }
        case ("Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."):{
            messageErrorFirebase = t("erros.password.manyRequests")
            break
        }
    }

    return {errors, setValues, values, other, setOther, messageErrorFirebase}
}

export default useValidation
