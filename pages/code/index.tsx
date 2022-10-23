import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { ReactElement } from "react"
import Code from "../../components/feed/Recomendations/Code"
import Layout from "../../components/Layout"
import { NextPageWithLayout } from "../_app"

const Codehome: NextPageWithLayout = () => {
    const { t } = useTranslation("header")
    
  return (
    <>
    <Head>
        <title>{t("categories.code")}</title>
        <link rel="icon" href="/icon.png" />
    </Head>
    <Code />
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
    props: {
      ...await serverSideTranslations(locale, ['header','common']),
    },
})
  
Codehome.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
}

export default Codehome