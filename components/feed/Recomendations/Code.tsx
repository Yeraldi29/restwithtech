import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { code } from "../../../arrays/feedImages/code"
import NewSection from "../NewSection"

const Code = () => {
  const { t } = useTranslation("common")
  const router = useRouter()

  return (
    <div>
      {router.asPath !== "/" ? (
        <NewSection  section={code} title={t("categories.code")} message={t("message.code")} presentationImage={"/Feed/code/adi-goldstein-mDinBvq1Sfg-unsplash.jpg"}/>
        ) : (
        <NewSection  section={code} title={t("categories.code")} />
      )}
    </div>
  )
}

export default Code