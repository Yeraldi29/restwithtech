import { useTranslation } from "next-i18next"
import Link from "next/link"

const CannotComment = () => {
    const { t } = useTranslation("newPost")

  return (
    <div className=" w-full h-full flex items-center justify-center rounded-lg -rotate-1 mt-4 p-4 bg-DarkBlueGray border-4 border-Blue-Gray">
        <h1 className=" text-2xl  rotate-1 text-center">
            {t("createComment.noAccount.you")}<br /> 
            <Link href={"/log-in"}><span className=" text-Lavender-Blue lg:hover:text-3xl "> {t("createComment.noAccount.log-in")}</span></Link>
            <span> {t("createComment.noAccount.or")}</span>
            <Link href="/sign-in" ><span className=" text-BabyBlueEyes lg:hover:text-3xl"> {t("createComment.noAccount.sign-in")}</span></Link>
        </h1>
    </div>
  )
}

export default CannotComment