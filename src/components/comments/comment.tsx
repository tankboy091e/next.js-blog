import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import styles from 'sass/components/comments/comment.module.scss'
import FormProvider from 'providers/formProvider'
import Input from './input'
import { useComments } from './inner'

type commentState = 'default' | 'edit' | 'pending'

export interface commentData {
  id: string
  name: string
  content: string
  createdAt: string
}

export default function Comment({
  index,
  data,
}: {
  index: number
  data: commentData
}) {
  const router = useRouter()
  const {
    id, name, content,
  } = data
  const [state, setState] = useState<commentState>()
  const [extended, setExtended] = useState(false)
  const [password, setPassword] = useState(null)
  const { refresh } = useComments()

  const onEdit = async () => {
    const password = prompt('비밀번호를 입력하세요.')
    const res = await fetch('/api/comments/validate', {
      body: JSON.stringify({
        id,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    if (res.ok) {
      setPassword(password)
      setState('edit')
    } else {
      const { message } = await res.json()
      alert(message)
    }
  }

  const onDelete = async () => {
    const password = prompt('정말로 지우시겠습니까? 비밀번호를 입력하세요.')
    const formData = new FormData()
    formData.append('id', id)
    formData.append('password', password)
    const res = await fetch(`/api/comments${router.asPath}`, {
      body: formData,
      method: 'DELETE',
    })
    if (res.status === 200) {
      refresh()
    } else {
      const { message } = await res.json()
      alert(message)
    }
  }

  useEffect(() => {
    setState('default')
  }, [content])

  if (state === 'edit') {
    return (
      <FormProvider>
        <Input
          id={id}
          method="PUT"
          submitValue="Edit"
          name={name}
          password={password}
          content={content}
          nameDisabled
          passwordDisabled
        />
      </FormProvider>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.name}>{name}</span>
        <div className={styles.arrow} />
      </header>
      <div className={styles.body}>
        <p className={styles.content}>{content}</p>
        <div className={styles.sideMenu}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setExtended(!extended)}
          >
            <HiOutlineDotsVertical size={20} />
          </button>
          {extended && (
            <div className={styles.menu}>
              <div className={styles.buttonWrapper}>
                <button type="button" onClick={onEdit}>수정</button>
              </div>
              <div className={styles.buttonWrapper}>
                <button type="button" onClick={onDelete}>삭제</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
