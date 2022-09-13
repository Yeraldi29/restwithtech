import { useTranslation } from "next-i18next"
import Link from "next/link"
import {AiOutlineGithub, AiOutlineGoogle} from "react-icons/ai"

const Sign_In = () => {
  const { t } = useTranslation("signIn_logIn")
    
  return (
    <div className=" bg-DarkBlueGray border -rotate-1 mx-auto mt-6 rounded-2xl w-80 shadow-2xl">
        <h2 className="text-center text-2xl">{t("signIn.signin").toUpperCase()}</h2>
        <form className=" flex flex-col">
            <label>
                <p>{t("email")}</p>
            </label>
                <input className=" input" type="email" name="email" />
            <label>
                <p>{t("password")}</p>
            </label>
                <input className=" input" type="password" name="password" />
            <button className=" bg-white text-red-600  mx-auto p-3 rounded-xl">
                <p className=" font-bold text-xl">{t("signIn.signin").toUpperCase()}</p>
            </button>
        </form>
        <div className="flex items-center justify-center space-x-3">
            <div className=" w-8 h-8 rounded-xl -rotate-45 border-2 bg-Lavender-Blue flex items-center justify-center border-black first-letter:">
                <AiOutlineGithub className=" w-6 h-6 rotate-45 text-black"></AiOutlineGithub>
            </div>
            <div className=" w-8 h-8 rounded-xl -rotate-45 border-2 border-red-500 bg-Lavender-Blue flex items-center justify-center">
                <AiOutlineGoogle className=" w-6 h-6 rotate-45 text-red-500"></AiOutlineGoogle>
            </div>
        </div>
        <div className="flex justify-center items-center">
            <p>{t("signIn.areUser")}</p>
            <div className=" bg-Lavender-Blue rounded-xl text-DarkBlueGray font-semibold">
                <Link href={""}>
                    <p className=" m-1">{t("logIn.login")}</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Sign_In
