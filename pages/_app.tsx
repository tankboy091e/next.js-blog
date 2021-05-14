import { AppProps } from 'next/app'
import Head from 'next/head'
import AuthProvider from 'providers/authProvider'
import ModalProvider from 'providers/modalProvider'
import 'sass/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AuthProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </AuthProvider>
    </>
  )
}
