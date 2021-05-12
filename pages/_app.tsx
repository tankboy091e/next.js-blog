import { AppProps } from 'next/app'
import Head from 'next/head'
import AuthProvider from 'providers/authProvider'
import 'sass/global.scss'

const appContainerID = 'appContainer'
const modalContainerID = 'modalContainer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AuthProvider>
        <div id={appContainerID}>
          <Component {...pageProps} />
        </div>
        <div id={modalContainerID} />
      </AuthProvider>
    </>
  )
}

export function getAppContainer() : HTMLElement {
  return document.getElementById(appContainerID)
}

export function getModalContainer(): HTMLElement {
  return document.getElementById(modalContainerID)
}
