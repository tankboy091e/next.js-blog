import Footer from 'components/footer'
import AuthProvider from 'providers/auth'
import React from 'react'
import styles from 'sass/layouts/default.module.scss'

export const mainContainerID = 'main'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className={styles.container}>
        <main id={mainContainerID} className={styles.main}>
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export function getMainContainer() {
  return document.getElementById(mainContainerID)
}
