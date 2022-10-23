import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { ReactElement } from "react"
import Computers_Portables from "../../components/feed/Recomendations/Computers_Portables"
import Layout from "../../components/Layout"
import { NextPageWithLayout } from "../_app"

const Computers_Laptops: NextPageWithLayout = () => {
    const { t } = useTranslation("header")
    
  return (
    <>
    <Head>
        <title>{t("categories.C&P")}</title>
        <link rel="icon" href="/icon.png" />
    </Head>
    <Computers_Portables />
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
    props: {
      ...await serverSideTranslations(locale, ['header','common']),
    },
})
  
Computers_Laptops.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
}

export default Computers_Laptops