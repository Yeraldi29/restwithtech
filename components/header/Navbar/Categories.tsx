import Category from "./Category"
import { useTranslation } from "next-i18next"

const Categories = () => {
    const { t } = useTranslation("header")

  return (
    <>
     <Category count={0} text={t("categories.tech")} path={"tech"}/>
     <Category count={1} text={t("categories.mobile")} path={"mobile"}/>
     <Category count={2} text={t("categories.C&P")} path={"computers&laptops"}/>
     <Category count={3} text={t("categories.os")} path={"OS"}/>
     <Category count={4} text={t("categories.code")} path={"code"}/>   
    </>
  )
}

export default Categories
