import { useTranslation } from "next-i18next"

const InputUsername = () => {
  const { t } = useTranslation("signIn_logIn")
    
  return (
    <>
    <label>{t("CompleteProfile.userName")}</label>
    <input className="input" type="text" />
    </>
  )
}

export default InputUsername