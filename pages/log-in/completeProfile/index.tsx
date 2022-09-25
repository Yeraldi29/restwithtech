import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import ButtonForms from "../../../components/forms/ButtonForms"
import ChooseImageProfile from "../../../components/forms/ChooseImageProfile"
import InputUsername from "../../../components/forms/InputUsername"
import Language from "../../../components/header/Language"
import type { NextPageWithLayout } from "../../_app"
import { useState } from "react"

const CompleteProfile:NextPageWithLayout = () => {
  const { t } = useTranslation("signIn_logIn")
  
  const [validation, setValidation] = useState(false)
  const [submit, setSubmit] = useState(false)
  
  return (
    <>
    <Head>
        <title>{t("CompleteProfile.title")}</title>
        <link rel="icon" href="/icon.png" />
    </Head>
    
    <div className=" relative bg-DarkBlueGray border -rotate-1 mx-auto mt-2 rounded-2xl w-[21.5rem] shadow-2xl py-10 px-6 sm:w-96 sm:mt-6 sm:px-8 xl:mt-16">
        <div className=" absolute inset-0 left-4 top-4">
        <Language />
        </div>
        <h2 className="text-center text-2xl my-4">{t("CompleteProfile.announced")}</h2>
        <h3 className="text-center text-base mb-4">{t("CompleteProfile.before")}</h3>
        <form className="flex flex-col">
          <InputUsername />
          <ChooseImageProfile />
          <ButtonForms validation={validation} title={t("save")} submit={submit} />
        </form>
    </div>
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['signIn_logIn','header']),
  },
})

CompleteProfile.getLayout = (page) => page

export default CompleteProfile