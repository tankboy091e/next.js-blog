import { AppProps } from 'next/app'
import Head from 'next/head'
import AuthProvider from 'providers/auth'
import ModalProvider from 'providers/modal'
import 'sass/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>오진수의 블로그</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ModalProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ModalProvider>
    </>
  )
}
