import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { ReactElement } from "react"
import Layout from "../../components/Layout"
import OS from "../../components/feed/Recomendations/OS"
import { NextPageWithLayout } from "../_app"

const OShome: NextPageWithLayout = () => {
  const { t } = useTranslation("header")
  
  return (
    <>
    <Head>
        <title>{t("categories.os")}</title>
        <link rel="icon" href="/icon.png" />
    </Head>
    <OS />
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
    props: {
      ...await serverSideTranslations(locale, ['header','common']),
    },
})
  
  OShome.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
  }

export default OShome