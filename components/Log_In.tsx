import { useTranslation } from "next-i18next"
import FormContainer from "./FormContainer"

const Log_In = () => {
  const { t } = useTranslation("signIn_logIn")
    
  return (
    <FormContainer 
    title={t("logIn.login")}  
    email={t("email")}
    password={t("password")}
    tryAccount={t("try")}
    account={t("logIn.account")}
    change={t("signIn.signin")}
    forgotPassword={t("logIn.forgotPassword")}
    remember={t("logIn.remember")}
    />
  )
}

export default Log_In