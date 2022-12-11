import { useTranslation } from "next-i18next"
import NewSection from "../NewSection"
import { tech } from "../../../arrays/feedImages/tech"
import { useRouter } from "next/router"

const Tech = () => {
  const { t } = useTranslation("common")
  const router = useRouter()

  return (
    <div>
      {router.asPath !== "/" ? (
      <NewSection  section={tech} title={t("categories.tech")} message={t("message.tech")} presentationImage="/Feed/technoligies/alex-knight-2EJCSULRwC8-unsplash.jpg"/>
      ) : (
      <NewSection  section={tech} title={t("categories.tech")}/>
      )}
    </div>
  )
}

export default Tech