import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { C_L } from "../../../arrays/feedImages/C_L"
import NewSection from "../NewSection"

const Computers_Portables = () => {
  const { t } = useTranslation("common")
  const router = useRouter()

  return (
    <div>
      {router.asPath !== "/" ? (
        <NewSection  section={C_L} title={t("categories.C&P")} message={t("message.C&P")} presentationImage={"/Feed/C_L/firos-nv-1wBmbnvv4TE-unsplash.jpg"}/>
      ) : (
      <NewSection  section={C_L} title={t("categories.C&P")} />
      )}
    </div>
  )
}

export default Computers_Portables