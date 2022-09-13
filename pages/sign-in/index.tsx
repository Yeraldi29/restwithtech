import type { NextPage } from 'next'
import Head from 'next/head'
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import ComeBack from '../../components/ComeBack'
import { useTranslation } from 'next-i18next'
import Sign_In from '../../components/Sign_In'

const SignIn: NextPage = () => {
    const { t } = useTranslation("signIn_logIn")

  return (
    <>
      <Head>
        <title>{t("signIn.signin")}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <ComeBack />
      <Sign_In />      
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['signIn_logIn','header']),
  },
})

export default SignIn
