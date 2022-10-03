import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword} from "firebase/auth"
import type { NextRouter } from "next/router"
import type { TFunction } from "next-i18next"

interface PropsUserActions{
    validation: boolean
    formValues:{
        email: string
        password: string
    }
    handleOther: (err:string|boolean) => void
    handleTimeActive: (time: boolean) => void
    title: string
    Router: NextRouter
    t: TFunction
}

const UserActions = ({validation, formValues, handleOther, handleTimeActive, title,Router, t}: PropsUserActions) =>{
    const auth = getAuth()
    const locale = Router.locale

    if(validation){
        switch(title){
            case (t("signIn.signin")):{
                createUserWithEmailAndPassword(auth, formValues.email, formValues.password ).then(userCredentials=>{
                sendEmailVerification(userCredentials.user).then(()=>{
                    Router.push(`${locale === "es/" ? locale : "" } sign-in/verification`)
                        handleTimeActive(true)
                })
            }).catch(err => {
                handleOther(err.message)
                console.log("🚀 ~ file: FormInputs.tsx ~ line 64 ~ createUserWithEmailAndPassword ~ err.message", err.message)
            })  
            break
            }
            case (t("logIn.login")):{
                signInWithEmailAndPassword(auth,formValues.email,formValues.password)
                .then(userCredantials => {
                    debugger
                    const user = userCredantials.user
                    if(user.emailVerified){
                        if(user.displayName === null && user.photoURL === null){
                            Router.push(`${locale === "es/" ? locale : "" }log-in/completeProfile`)
                        }else{
                            Router.push("/")
                        }
                    }else{
                        handleOther(user.emailVerified)
                    }
                })
                .catch(err => {
                    handleOther(err.message)
                    console.log("🚀 ~ file: UserActions.ts ~ line 38 ~ UserActions ~ err.message", err.message)
                })
                break
            }
        }    
    }
}

export default UserActions
