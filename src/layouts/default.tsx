import Footer from 'components/footer'
import React from 'react'
import styles from 'sass/layouts/default.module.scss'

export const mainContainerID = 'main'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
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
