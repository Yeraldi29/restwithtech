import { auth } from "../../firebase"
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "firebase/auth"

interface PropsUserActions{
    validation: boolean
    formValues:{
        email: string
        password: string
    }
    path: string
    handleOther: (err:string) => void
}

const UserActions = ({validation, formValues, path, handleOther}: PropsUserActions) => {
    const Auth = getAuth();

    if(validation && path === "/sign-in"){
        createUserWithEmailAndPassword(auth, formValues.email, formValues.password ).then(userCredentials=>{
            sendEmailVerification(userCredentials.user).then(()=>{
                console.log(userCredentials.user);
            })
            // Auth.signOut()
        }).catch(err => {
            handleOther(err.message)
            console.log("🚀 ~ file: FormInputs.tsx ~ line 64 ~ createUserWithEmailAndPassword ~ err.message", err.message)
        })
    }

}

export default UserActions
