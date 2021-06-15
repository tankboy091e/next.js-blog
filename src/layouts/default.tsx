import Background from 'components/background'
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
      <Background />
      <div className={styles.container}>
        <main id={mainContainerID} className={styles.main}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export function getMainContainer() {
  return document.getElementById(mainContainerID)
}
