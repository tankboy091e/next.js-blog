import Footer from 'components/footer'
import Head from 'next/head'
import { DEFAULT_TITLE } from 'pages/_app'
import React from 'react'
import styles from 'sass/layouts/default.module.scss'

export const mainContainerID = 'main'

export default function Layout({
  children,
  title,
  description,
}: {
  children: React.ReactNode
  title?: string,
  description?: string
}) {
  const _title = title ? `${title} - ${DEFAULT_TITLE}` : DEFAULT_TITLE
  const _description = description || '오진수의 블로그입니다'
  return (
    <>
      <Head>
        <title>{_title}</title>
        <meta name="description" content={_description} />
        <meta property="og:title" content={_title} />
        <meta property="og:description" content={_description} />
      </Head>
      <main id={mainContainerID} className={styles.main}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export function getMainContainer() {
  return document.getElementById(mainContainerID)
}
