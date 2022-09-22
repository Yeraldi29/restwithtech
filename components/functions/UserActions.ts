import { auth } from "../../firebase"
import { createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth"
import type { NextRouter } from "next/router"

interface PropsUserActions{
    validation: boolean
    formValues:{
        email: string
        password: string
    }
    handleOther: (err:string) => void
    handleTimeActive: (time: boolean) => void
    Router: NextRouter
}

const UserActions = ({validation, formValues, handleOther, handleTimeActive, Router}: PropsUserActions) => {
    const path = Router.asPath
    const locale = Router.locale

    if(validation && `${locale}${path}` ===  `${locale}/sign-in` ){
        createUserWithEmailAndPassword(auth, formValues.email, formValues.password ).then(userCredentials=>{
            sendEmailVerification(userCredentials.user).then(()=>{
                Router.push(`${locale === "es/" ? locale : "" } sign-in/verification`)
                handleTimeActive(true)
                console.log(userCredentials.user.email);
            })
        }).catch(err => {
            handleOther(err.message)
            console.log("🚀 ~ file: FormInputs.tsx ~ line 64 ~ createUserWithEmailAndPassword ~ err.message", err.message)
        })
    }

}

export default UserActions
