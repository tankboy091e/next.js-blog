import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import 'sass/global.scss'

export const DEFAULT_TITLE = '제대로 된 이성을 되찾기'

export default function App({ Component, pageProps }: AppProps) {
  const ModalProvider = dynamic(() => import('providers/modal'))
  const AuthProvider = dynamic(() => import('providers/auth'))
  const { titleHead, descriptionHead } = pageProps
  const title = titleHead ? `${titleHead} - ${DEFAULT_TITLE}` : DEFAULT_TITLE
  const description = descriptionHead || '오진수의 블로그입니다'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="오진수" />
        <meta name="og:url" content="https://ohjinsu.me" />
        <meta name="og:site_name" content={DEFAULT_TITLE} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:type" content="website" />
        <meta name="og:image" content="https://www.ohjinsu.me/favicon.ico" />
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
