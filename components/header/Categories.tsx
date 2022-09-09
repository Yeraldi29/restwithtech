import { useTranslation } from "next-i18next"
import { useState } from "react"
import { BiMenu } from "react-icons/bi"
import Category from "./Categories/Category"
import Menu from "./Menu"

const Categories = () => {
    const [click, setClick] = useState(false)
    const { t } = useTranslation("header")
    
  return (
    <>
    <div className="hidden lg:flex">
      <Category count={0} text={t("categories.tech")}/>
      <Category count={1} text={t("categories.mobile")}/>
      <Category count={2} text={t("categories.C&P")}/>
      <Category count={3} text={t("categories.os")}/>
      <Category count={4} text={t("categories.code")}/>
    </div>
    <div>
    <BiMenu  className=" w-16 h-16 -rotate-12 lg:hidden" onClick={()=>setClick(true)}/>
    <Menu click={click} setClick={setClick}/>
    </div>
    </>
  )
}

export default Categories
