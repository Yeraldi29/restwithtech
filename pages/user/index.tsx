import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { ReactElement } from "react"
import Layout from "../../components/Layout"
import UserProfile from "../../components/user/UserProfile"
import { NextPageWithLayout } from "../_app"

const User: NextPageWithLayout = () => {
    const { t } = useTranslation("user")
    
  return (
    <>
      <Head>
        <title>{t("user")}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <UserProfile />
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
    props: {
      ...await serverSideTranslations(locale, ['header','user']),
    },
})
  
User.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
}

export default User