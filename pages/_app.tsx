import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import 'sass/global.scss'

export const DEFAULT_TITLE = '제대로 된 이성을 되찾기'

export default function App({ Component, pageProps }: AppProps) {
  const ModalProvider = dynamic(() => import('providers/modal'))
  const AuthProvider = dynamic(() => import('providers/auth'))
  const { titleHead, descriptionHead, typeHead } = pageProps
  const title = titleHead ? `${titleHead} - ${DEFAULT_TITLE}` : DEFAULT_TITLE
  const description = descriptionHead || '오진수의 블로그입니다'
  const type = typeHead || 'website'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="오진수" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:url" content="https://ohjinsu.me" />
        <meta property="og:site_name" content={DEFAULT_TITLE} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:image" content="https://www.ohjinsu.me/preview.png" />
      </Head>
      <ModalProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ModalProvider>
    </>
  )
}
