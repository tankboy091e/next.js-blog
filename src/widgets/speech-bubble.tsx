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
    <div className={styles.container}>
      <header className={styles.header}>
        {head}
        <div className={styles.arrow} />
      </header>
      <div className={styles.body}>
        <div className={styles.content}>{body}</div>
        {(needsAuth ? user : true) && (
          <EditDeleteMenu
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  )
}
