import { useAuth } from 'providers/auth'
import React, { useState } from 'react'
import styles from 'sass/widgets/speech-bubble.module.scss'
import { HiOutlineDotsVertical } from 'react-icons/hi'

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
  const [extended, setExtended] = useState(false)
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
          <div className={styles.sideMenu}>
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setExtended(!extended)}
            >
              <HiOutlineDotsVertical size={16} />
            </button>
            {extended && (
              <div className={styles.menu}>
                <div className={styles.buttonWrapper}>
                  <button type="button" onClick={onEdit}>
                    수정
                  </button>
                </div>
                <div className={styles.buttonWrapper}>
                  <button type="button" onClick={onDelete}>
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
