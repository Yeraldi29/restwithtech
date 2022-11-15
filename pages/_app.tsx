import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Layout from '../components/Layout'
import {appWithTranslation} from 'next-i18next'
import { State } from '../store/store'
import { AuthProvider } from '../store/AuthContext'
import { FormS_LProvider } from '../store/FormContextS_L'
import { CreateContentContext } from '../store/CreateContentContext'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) =>{
  const getLayout = Component.getLayout ?? Layout
    return (
        <AuthProvider >
          <State>
            <FormS_LProvider>
              <CreateContentContext>
                {getLayout(<Component {...pageProps} />)}
              </CreateContentContext>
            </FormS_LProvider>
          </State>
        </AuthProvider>
    )
}

export default appWithTranslation(MyApp)