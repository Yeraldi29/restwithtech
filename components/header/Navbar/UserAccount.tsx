import { useTranslation } from "next-i18next"

const UserAccount = () => {
    const { t } = useTranslation("header")

  return (
    <div className="border mt-6 mx-7 rounded-2xl lg:m-0 lg:w-28 ">
        <div className=" bg-Lavender-Blue rounded-t-2xl hover:cursor-pointer lg:w-full hover:opacity-50">
            <h2 className="text-2xl flex items-center justify-center p-2 lg:py-1  text-Blue-Gray lg:text-base xl:text-lg ">{t("sign-in")}</h2>
        </div>
        <div className="hover:opacity-50">
        <h2 className="text-2xl flex items-center justify-center p-2 lg:py-1  hover:cursor-pointer lg:text-base xl:text-lg ">{t("log-in")}</h2>
        </div>
    </div>
  )
}

export default UserAccount
