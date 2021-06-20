import React from 'react'
import styles from 'sass/components/dialog.module.scss'

export default function Inner({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={styles.container}>
      {children}
    </section>
  )
}
