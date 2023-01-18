import { useTranslation } from "next-i18next"
import FormContainerS_L from "./FormContainerS_L"

const Sign_In = () => {
  const { t } = useTranslation("signIn_logIn")
  return (
    <FormContainerS_L
    title={t("signIn.signin")}  
    tryAccount={t("try")}
    account={t("signIn.areUser")}
    change={t("logIn.login")}
    option="log-in"
    />
  )
}

export default Sign_In
