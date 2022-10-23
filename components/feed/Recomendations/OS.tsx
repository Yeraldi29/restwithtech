import { useTranslation } from "next-i18next"
import { SO } from "../../../arrays/feedImages/SO"
import NewSection from "../NewSection"

const OS = () => {
  const { t } = useTranslation("common")

  return (
    <div>
      <NewSection  section={SO} title={t("categories.os")} message={t("message.os")} presentationImage="/Feed/SO/tadas-sar-T01GZhBSyMQ-unsplash.jpg"/>
    </div>
  )
}

export default OS