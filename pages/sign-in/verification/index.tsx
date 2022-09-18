import { NextPageWithLayout } from "../../_app"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"

const Verification: NextPageWithLayout = () => {
   const {t} = useTranslation("signIn_logIn")
  
  return (
    <>
    <Head>
      <title>{t("try")}</title>
      <link rel="icon" href="/icon.png" />
    </Head>
    <div>
      {t("password")}
    </div>
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['signIn_logIn','header']),
  },
})

Verification.getLayout = (page) => page

export default Verification