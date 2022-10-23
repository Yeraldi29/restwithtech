import { useTranslation } from "next-i18next"
import { C_L } from "../../../arrays/feedImages/C_L"
import NewSection from "../NewSection"

const Computers_Portables = () => {
  const { t } = useTranslation("common")

  return (
    <div>
      <NewSection  section={C_L} title={t("categories.C&P")} message={t("message.C&P")} presentationImage={"/Feed/C_L/firos-nv-1wBmbnvv4TE-unsplash.jpg"}/>
    </div>
  )
}

export default Computers_Portables