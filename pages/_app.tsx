import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import {appWithTranslation} from 'next-i18next'
import { StateClick } from './store'

const MyApp = ({ Component, pageProps }: AppProps) =>{
    return (
        <StateClick>
            <Layout>
            <Component {...pageProps} />
            </Layout>
        </StateClick>
    )
}

export default appWithTranslation(MyApp)