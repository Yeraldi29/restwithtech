import Category from "./Category"
import { useTranslation } from "next-i18next"

const Categories = () => {
    const { t } = useTranslation("header")

  return (
    <>
     <Category count={0} text={t("categories.tech")}/>
      <Category count={1} text={t("categories.mobile")}/>
      <Category count={2} text={t("categories.C&P")}/>
      <Category count={3} text={t("categories.os")}/>
      <Category count={4} text={t("categories.code")}/>   
    </>
  )
}

export default Categories
