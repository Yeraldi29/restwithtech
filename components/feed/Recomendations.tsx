import { useTranslation } from "next-i18next"
import { mostRecents } from "../../arrays/feedImages/allCategories"
import NewSection from "./NewSection"

const Recomendations = () => {
  const { t } = useTranslation("common")
  
  return (
    <NewSection section={mostRecents} title={t("recent")}/>
  )
}

export default Recomendations