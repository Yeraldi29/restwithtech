import { useTranslation } from "next-i18next"
import FormContainer from "./FormContainer"

const Sign_In = () => {
  const { t } = useTranslation("signIn_logIn")
  return (
    <FormContainer 
    title={t("signIn.signin")}  
    email={t("email")}
    password={t("password")}
    tryAccount={t("try")}
    account={t("signIn.areUser")}
    change={t("logIn.login")}
    />
  )
}

export default Sign_In
