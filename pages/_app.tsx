import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import {appWithTranslation} from 'next-i18next'
import { StateClick } from './store'
import { ThemeProvider } from "@material-tailwind/react";

const MyApp = ({ Component, pageProps }: AppProps) =>{
    return (
       <ThemeProvider>
          <StateClick>
            <Layout>
                <Component {...pageProps} />
            </Layout>
          </StateClick>
       </ThemeProvider>
    )
}

export default appWithTranslation(MyApp)