import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { SO } from "../../../arrays/feedImages/SO"
import NewSection from "../NewSection"

const OS = () => {
  const { t } = useTranslation("common")
  const router = useRouter()

  return (
    <div>
      {router.asPath !== "/" ? (
        <NewSection  section={SO} title={t("categories.os")} message={t("message.os")} presentationImage="/Feed/SO/tadas-sar-T01GZhBSyMQ-unsplash.jpg"/>
      ) : (
        <NewSection  section={SO} title={t("categories.os")} />
      )}

      
    </div>
  )
}

export default OS