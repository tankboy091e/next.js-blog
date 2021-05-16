import Navigation from 'components/navigation'
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
      <Navigation />
      <main id={mainContainerID} className={styles.main}>
        { children }
      </main>
    </>
  )
}

export function getMainContainer() {
  return document.getElementById(mainContainerID)
}
