import { signOut } from "firebase/auth"
import { useTranslation } from "next-i18next"
import { auth } from "../../firebase"

const SignOut = () => {
    const { t } = useTranslation("header")

    const handleSignOut = () => {
      signOut(auth).then(()=>{
      }).catch(err => {
        console.log("🚀 ~ file: SignOut.tsx ~ line 12 ~ signOut ~ err.message", err.message)
      })
    }

  return (
    <div className=" border-2 rounded-lg bg-red-400 mx-auto w-24 mt-2 cursor-pointer lg:hover:opacity-50" 
    onClick={handleSignOut}>
     <h2 className="text-center text-xl lg:text-lg xl:text-xl py-2">{t("sign-out")}</h2>  
    </div>
  )
}

export default SignOut