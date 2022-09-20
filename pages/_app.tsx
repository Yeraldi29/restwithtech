import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Layout from '../components/Layout'
import {appWithTranslation} from 'next-i18next'
import { StateClick } from './store'
import { AuthProvider } from './AuthContext'
import { ThemeProvider } from "@material-tailwind/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) =>{
  const getLayout = Component.getLayout ?? Layout
    return (
       <ThemeProvider>
        <AuthProvider >
          <StateClick>
                {getLayout(<Component {...pageProps} />)}
          </StateClick>
        </AuthProvider>
       </ThemeProvider>
    )
}

export default appWithTranslation(MyApp)