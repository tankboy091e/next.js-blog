import React from 'react'
import styles from 'sass/components/dialog.module.scss'

export default function Dialog({
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
