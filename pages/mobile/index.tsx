import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { ReactElement } from "react"
import Mobiles from "../../components/feed/Recomendations/Mobiles"
import Layout from "../../components/Layout"
import { NextPageWithLayout } from "../_app"

const Mobilehome: NextPageWithLayout = () => {
  const { t } = useTranslation("header")
  
  return (
    <>
    <Head>
        <title>{t("categories.mobile")}</title>
        <link rel="icon" href="/icon.png" />
    </Head>
    <Mobiles />
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
    props: {
      ...await serverSideTranslations(locale, ['header','common']),
    },
})
  
  Mobilehome.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
  }

export default Mobilehome