import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { ReactElement } from "react"
import Tech from "../../components/feed/Recomendations/Tech"
import Layout from "../../components/Layout"
import { NextPageWithLayout } from "../_app"

const Technologies: NextPageWithLayout = () => {
  const { t } = useTranslation("header")
  
  return (
    <>
      <Head>
          <title>{t("categories.tech")}</title>
          <link rel="icon" href="/icon.png" />
      </Head>
      <Tech />
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
    props: {
      ...await serverSideTranslations(locale, ['header','common']),
    },
})
  
  Technologies.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
  }

export default Technologies