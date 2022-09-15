import { useTranslation } from "next-i18next"
import  Link  from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import { menuClick } from "../../../pages/store" 

const UserAccount = () => {
  const { t } = useTranslation("header")
  const router = useRouter()
  const clickState = useContext(menuClick)
  const {handleClick} = clickState

  return (
    <div className="border mt-6 mx-7 rounded-2xl lg:m-0 lg:w-28 ">
        <div className="border bg-Lavender-Blue rounded-t-2xl hover:cursor-pointer lg:w-full hover:opacity-50 active:opacity-100 active:bg-white" onClick={()=>handleClick(false)}>
          <Link href="/sign-in" locale={router.locale}>
            <h2 className="text-2xl flex items-center justify-center p-2 lg:py-1  text-Blue-Gray lg:text-base xl:text-lg ">
                {t("sign-in")}
            </h2>
          </Link>
        </div>
        <div className=" hover:opacity-50 active:opacity-100 active:text-DarkBlueGray active:bg-white rounded-b-2xl" onClick={()=>handleClick(false)}>
        <Link href={"/log-in"} locale={router.locale}>
          <h2 className="text-2xl flex items-center justify-center p-2 lg:py-1  hover:cursor-pointer lg:text-base xl:text-lg ">{t("log-in")}</h2>
        </Link>
        </div>
    </div>
  )
}

export default UserAccount
