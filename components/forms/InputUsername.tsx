import { useTranslation } from "next-i18next"
import { useState, useEffect, useContext } from "react"
import useValidation from "../../Hooks/useValidation"
import { profileImage } from "../../store/store"

interface InputUsernameProps {
  userName:string
  handleUserName: (value:string) => void
  submit:boolean
  handleClick:()=>void
  handleValidation: (messageError: boolean) => void
  handleChangeUserName: () => void
}

const InputUsername = ({userName, handleUserName,submit, handleClick, handleValidation, handleChangeUserName}: InputUsernameProps) => {
  const { t } = useTranslation("signIn_logIn")
  const [error, setError] = useState("")
  const { messageErrorFirebase } = useValidation()
  const profileImg = useContext(profileImage)
  const { imageProfile } = profileImg

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {value} = e.target
    handleUserName(value)
    handleChangeUserName()
  }

  useEffect(()=>{
    if(userName === ""){
      setError(t("CompleteProfile.error.username"))
    }else{
      setError("")
    }
  },[userName])

  useEffect(()=>{
    if(error === "" && messageErrorFirebase === "" && imageProfile !== ""){
      handleValidation(true)
    } else {
      handleValidation(false)
    }

  },[error, messageErrorFirebase, imageProfile])
  
  return (
    <>
    <label>{t("CompleteProfile.userName")}</label>
    <input className="input" type="text" onChange={handleChange} onClick={handleClick} />
    <small className={`${((error === "") || !submit)  && "hidden"} rotate-1 text-red-300 -mt-3`}>{error}</small>
    <small className={`${(messageErrorFirebase === "")  && "hidden"} rotate-1 text-red-300 -mt-3`}>{messageErrorFirebase}</small>
    </>
  )
}

export default InputUsername