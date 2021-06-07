import Footer from 'components/footer'
import { DEFAULT_TITLE } from 'pages/_app'
import React from 'react'
import styles from 'sass/layouts/default.module.scss'
import { NextSeo } from 'next-seo'

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
      <NextSeo
        title={_title}
        description={_description}
        openGraph={{
          url: 'https://ohjinsu.me',
          title: _title,
          type: 'website',
          images: [
            {
              url: 'https://www.ohjinsu.me/favicon.ico',
            },
          ],
          description: _description,
          site_name: DEFAULT_TITLE,
        }}
      />
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
