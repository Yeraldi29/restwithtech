import Head from 'next/head'
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import { useTranslation } from 'next-i18next'
import Sign_In from '../../components/Sign_In'
import { NextPageWithLayout } from '../_app'
import { useAuthValue } from '../../store/AuthContext'
import Router from 'next/router'

const SignIn: NextPageWithLayout = () => {
    const { t } = useTranslation("signIn_logIn")
    const { profile } = useAuthValue() 

    if( profile === "profile"){
      Router.push("/") 
     }

  return (
    <>
      <Head>
        <title>{t("signIn.signin")}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Sign_In />      
    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:string}) => ({
  props: {
    ...await serverSideTranslations(locale, ['signIn_logIn','header']),
  },
})

SignIn.getLayout = (page) => page

export default SignIn
