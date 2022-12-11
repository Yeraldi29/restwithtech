import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { mobile } from "../../../arrays/feedImages/mobile"
import NewSection from "../NewSection"

const Mobiles = () => {
  const { t } = useTranslation("common")
  const router = useRouter()

  return (
    <div>
      {router.asPath !== "/" ? (
        <NewSection  section={mobile} title={t("categories.mobile")} message={t("message.mobile")} presentationImage={"/Feed/mobile/jonas-leupe-wK-elt11pF0-unsplash.jpg"}/>
      ) : (
        <NewSection  section={mobile} title={t("categories.mobile")} /> 
      )}
    </div>
  )
}

export default Mobiles