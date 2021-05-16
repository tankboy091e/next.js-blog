import { useAuth } from 'providers/auth'
import React from 'react'
import styles from 'sass/widgets/speech-bubble.module.scss'
import EditDeleteMenu from './edit-delete-menu'

export default function SpeechBubble({
  head,
  word,
  onEdit,
  onDelete,
  needsAuth = true,
}: {
  head: React.ReactNode
  word: string
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
        <p className={styles.content}>{word}</p>
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
