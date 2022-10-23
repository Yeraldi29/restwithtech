import { useTranslation } from "next-i18next"
import NewSection from "../NewSection"
import { tech } from "../../../arrays/feedImages/tech"

const Tech = () => {
  const { t } = useTranslation("common")

  return (
    <div>
      <NewSection  section={tech} title={t("categories.tech")} message={t("message.tech")} presentationImage="/Feed/technoligies/alex-knight-2EJCSULRwC8-unsplash.jpg"/>
    </div>
  )
}

export default Tech