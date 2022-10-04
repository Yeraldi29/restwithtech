import { useTranslation } from "next-i18next"

interface PropsInputEmail {
    formErrorsEmail: string
    submit: boolean
    formValuesEmail: string
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void
    inputPassword?: React.MutableRefObject<HTMLInputElement | null>
    messageErrorFirebase: string
    handleSetSubmit: () => void
}

const InputEmail = ({formErrorsEmail, submit,formValuesEmail,handleChange,inputPassword, messageErrorFirebase,handleSetSubmit}: PropsInputEmail) => {
  const { t } = useTranslation("signIn_logIn")

  return (
    <>
    <label>
            <p>{t("email")}</p>
        </label>
            <input 
            className={` input ${(formErrorsEmail === t("errors.email.empty") && submit || formErrorsEmail === t("errors.email.valid")) && " bg-red-300 focus:ring-red-500 "}`}
            type="text" name="email" value={formValuesEmail} onChange={handleChange} onClick={handleSetSubmit}
            onKeyDown={e => {
                if(formErrorsEmail === ""){
                    e.key === "Enter" && inputPassword?.current?.focus()
                }
            }}/>

           <p className={`${((formErrorsEmail === t("errors.email.empty") && !submit) || formErrorsEmail === "") ? "hidden " : "text-red-300 -mt-4 rotate-1"}`}>
                <small>{formErrorsEmail}</small>
           </p>
           <p className={`${messageErrorFirebase === "" ? "hidden" : " text-red-300 -mt-4 rotate-1"}`}>
            <small>{messageErrorFirebase}</small>
           </p>
    </>
  )
}

export default InputEmail
