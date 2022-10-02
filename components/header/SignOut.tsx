import { useTranslation } from "next-i18next"

const SignOut = () => {
    const { t } = useTranslation("header")

  return (
    <div className=" border-2 rounded-lg bg-red-400 mx-auto w-24 mt-2">
     <h2 className="text-center text-xl py-2">{t("sign-out")}</h2>  
    </div>
  )
}

export default SignOut