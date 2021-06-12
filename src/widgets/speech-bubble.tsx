import { useAuth } from 'providers/auth'
import React from 'react'
import styles from 'sass/widgets/speech-bubble.module.scss'
import EditDeleteMenu from './edit-delete-menu'

export default function SpeechBubble({
  head,
  body,
  onEdit,
  onDelete,
  needsAuth = true,
}: {
  head: React.ReactNode
  body: React.ReactNode
  onEdit: () => Promise<void>
  onDelete: () => Promise<void>
  needsAuth?: boolean
}) {
  const { user } = useAuth()
  return (
    <figure className={styles.container}>
      <section className={styles.header}>
        {head}
        <div className={styles.arrow} />
      </section>
      <blockquote className={styles.body}>
        <section className={styles.content}>{body}</section>
        {(needsAuth ? user : true) && (
          <EditDeleteMenu
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </blockquote>
    </figure>
  )
}
