import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import 'sass/global.scss'

export const DEFAULT_TITLE = '제대로 된 이성을 되찾기'

export default function App({ Component, pageProps }: AppProps) {
  const ModalProvider = dynamic(() => import('providers/modal'))
  const AuthProvider = dynamic(() => import('providers/auth'))
  return (
    <>
      <Head>
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
