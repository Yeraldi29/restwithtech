import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react"
import { BiHide, BiShow } from "react-icons/bi" 
import { Checkbox } from "@material-tailwind/react"
import useValidation from "../Hooks/useValidation"
import Link from "next/link"
import { useRouter } from "next/router"
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "firebase/auth"
import { auth } from "../firebase"

const initialValues = {
    email: "",
    password: ""
}

const FormInputs = ({email, password, title, remember}:{email:string, password: string, title: string, remember?:string}) => {
    const [animation, setAnimation] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [validation, setValidation] = useState(false)
    const [showPassword, setShowPassword] = useState({show:true, hide:false})
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErros] = useState(initialValues)
    const {errors, setValues, values} = useValidation()
    
    const { t } = useTranslation("signIn_logIn")

    const path = useRouter().asPath

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)  => {
        console.log(formValues.email);
        e.preventDefault()
        setValues(formValues)
        setFormErros(errors)

        // if(validation && path === "/sign-in"){
            // createUserWithEmailAndPassword(auth, formValues.email, formValues.password ).then(userCredentials=>{
            //     // sendEmailVerification(userCredentials.user)
            //     console.log(userCredentials.user.uid);
            // }).catch(err => {
            //     console.log("🚀 ~ file: FormInputs.tsx ~ line 39 ~ handleSubmit ~ err", err)
            // })
        // }
    }
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        setFormValues({...formValues,[name]:value})
    }

    useEffect(()=>{
        setValues(formValues)
        setFormErros(errors)

        if((formErrors.email.length ===  0) && (formErrors.password.length === 0)){
            setValidation(true)
        }else{
            setValidation(false)
        }
    },[formValues, values])
    
  return (
    <form className=" flex flex-col " onSubmit={handleSubmit}>
        <label>
            <p>{email}</p>
        </label>
            <input 
            className={` input ${(formErrors.email === t("errors.email.empty") && submit || formErrors.email === t("errors.email.valid")) && " bg-red-300 focus:ring-red-500 "}`}
            type="text" name="email" onChange={handleChange} onClick={()=> setSubmit(false)} />

            <p className={`${((formErrors.email === t("errors.email.empty") && !submit) || formErrors.email === "") ? "hidden " : "text-red-300 -mt-4 rotate-1"}`}>
                <small>{formErrors.email}</small>
            </p>

        <label>
            <p>{password}</p>
        </label>
        <div className=" relative ">
            <input 
            className={` input ${(formErrors.password === t("errors.password.empty") && submit || formErrors.password  === t("errors.password.valid")) && " bg-red-300 focus:ring-red-500 "}`} 
            type={showPassword.hide ? "text" : "password" } name="password" onChange={handleChange} onClick={()=> setSubmit(false)} />
            <BiShow className={` ${showPassword.hide ? "hidden ":" cursor-pointer w-8 h-8 text-DarkBlueGray absolute top-2 right-1 "}`} 
            onClick={()=>setShowPassword({...showPassword,show:!showPassword.show, hide:!showPassword.hide})}/>
            <BiHide className={`${showPassword.show ? "hidden ":" cursor-pointer w-8 h-8 text-DarkBlueGray absolute top-2 right-1 " }`}
            onClick={()=>setShowPassword({...showPassword,hide:!showPassword.hide, show:!showPassword.show})}/>
        </div>
        
        <p className={`${((formErrors.password === t("errors.password.empty") && !submit) ||
         formErrors.password === "") ? "hidden " : "text-red-300 -mt-4 rotate-1"}`}>
            <small>{formErrors.password}</small>
        </p>
        
        <div className={`relative flex items-center ${!remember && " hidden "}`}>
            <Checkbox className=" w-6 h-6 -rotate-12 text-Lavender-Blue focus:border-Lavender-Blue focus:ring-Lavender-Blue" color="pink"  defaultChecked />
            <p>{remember}</p>
        </div>

        <Link href={`${( validation && path === "/sign-in") ? "": ""}`}>
            <button type="submit" className={`${animation && " animate-wiggle "} bg-Lavender-Blue  mx-auto p-3 rounded-xl -rotate-12 my-4 active:bg-white text-red-600  cursor-pointer lg:hover:opacity-50`}
            onClick={()=>{
                setAnimation(true)
                setSubmit(true)
                const Auth = getAuth();
                console.log(Auth.currentUser);
                

    createUserWithEmailAndPassword(auth, formValues.email, formValues.password ).then(userCredentials=>{
        
        sendEmailVerification(userCredentials.user).then(()=>{
            console.log(userCredentials.user);
        })
        auth.signOut()
    }).catch(err => {
        console.log("🚀 ~ file: FormInputs.tsx ~ line 39 ~ handleSubmit ~ err", err)
    })
            }} onAnimationEnd={()=>{setAnimation(false)}}>
                <p className=" font-bold text-xl ">{title.toUpperCase()}</p>
            </button>   
        </Link>
    </form>
  )
}

export default FormInputs