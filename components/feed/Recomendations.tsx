import { useTranslation } from "next-i18next"
import { mostRecents } from "../../arrays/feedImages/allCategories"
import NewSection from "./NewSection"

const Recomendations = () => {
  const { t } = useTranslation("common")

  return (
    <NewSection section={mostRecents} title={t("recent")} message={t("message.home")} presentationImage="/Feed/matheus-ferrero-HQD4IQMqdp8-unsplash.jpg"/>
  )
}

export default Recomendations