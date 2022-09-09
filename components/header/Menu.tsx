import { useTranslation } from "next-i18next"
import { BiX } from "react-icons/bi"
import Category from "./Categories/Category"

interface Props {
    click:boolean
    setClick:React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = ({click, setClick}:Props) => {
    const { t } = useTranslation("header")

  return (
      <div className={`${click ? "top-32" : "-top-[30rem]"} transform duration-300 ease-out absolute bg-DarkBlueGray w-80 h-96 z-50 inset-0  mx-auto rounded-2xl lg:hidden`}>
      <div className=" w-64 mx-auto">
        <div className="border mt-6 mx-7 rounded-2xl">
            <div className=" bg-Lavender-Blue rounded-t-2xl ">
                <h2 className="text-2xl text-center py-2 text-Blue-Gray">{t("sign-in")}</h2>
            </div>
            <h2 className="text-2xl text-center py-2">{t("log-in")}</h2>
        </div>
        <div className=" mt-8">
                <Category count={0} text={t("categories.tech")}/>
                <Category count={1} text={t("categories.mobile")}/>
                <Category count={2} text={t("categories.C&P")}/>
                <Category count={3} text={t("categories.os")}/>
                <Category count={4} text={t("categories.code")}/>
        </div>
      </div>
      <BiX className=" absolute inset-y-0 right-0 w-12 h-12" onClick={() => setClick(false)}/>
      <div className="absolute inset-y-0">
        <div className="absolute w-6 h-6 bg-DarkBlueGray rounded-full -top-7 left-36"></div>
        <div className="absolute w-5 h-5 bg-DarkBlueGray rounded-full -top-12 left-40"></div>
        <div className="absolute w-4 h-4 bg-DarkBlueGray rounded-full -top-16 left-[9.2rem]"></div>
      </div>
    </div>
  )
}

export default Menu
