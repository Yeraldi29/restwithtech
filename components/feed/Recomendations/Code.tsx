import { useTranslation } from "next-i18next"
import { code } from "../../../arrays/feedImages/code"
import NewSection from "../NewSection"

const Code = () => {
  const { t } = useTranslation("common")

  return (
    <div>
      <NewSection  section={code} title={t("categories.code")} message={t("message.code")} presentationImage={"/Feed/code/adi-goldstein-mDinBvq1Sfg-unsplash.jpg"}/>
    </div>
  )
}

export default Code