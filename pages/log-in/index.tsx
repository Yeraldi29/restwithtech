import type { NextPage } from 'next'
import Head from 'next/head'
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import { useTranslation } from 'next-i18next'
import Log_In from '../../components/Log_In'

const LogIn: NextPage = () => {
    const { t } = useTranslation("signIn_logIn")

  return (
    <>
      <Head>
        <title>{t("logIn.login")}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Log_In />
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['signIn_logIn','header']),
  },
})

export default LogIn