import { useTranslation } from "next-i18next"
import { mobile } from "../../../arrays/feedImages/mobile"
import NewSection from "../NewSection"

const Mobiles = () => {
  const { t } = useTranslation("common")

  return (
    <div>
      <NewSection  section={mobile} title={t("categories.mobile")} message={t("message.mobile")} presentationImage={"/Feed/mobile/jonas-leupe-wK-elt11pF0-unsplash.jpg"}/>
    </div>
  )
}

export default Mobiles