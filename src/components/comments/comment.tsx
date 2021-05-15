/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import styles from 'sass/components/comments/comment.module.scss'
import SpeechBubble from 'widgets/speech-bubble'
import FormProvider from 'providers/form'
import usePageQuery from 'lib/hooks/page-query'
import Input from './input'
import { useComments } from './inner'

type commentState = 'default' | 'edit' | 'pending'

export interface commentData {
  id: string
  name: string
  content: string
  createdAt: string
}

export default function Comment({ data }: { data: commentData }) {
  const { category, current } = usePageQuery()
  const { id, name, content } = data
  const [state, setState] = useState<commentState>()
  const [password, setPassword] = useState(null)
  const { refresh } = useComments()

  const onEdit = async () => {
    const password = prompt('비밀번호를 입력하세요.')
    if (!password) {
      return
    }
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
      const { error } = await res.json()
      alert(error)
    }
  }

  const onDelete = async () => {
    const password = prompt('정말로 지우시겠습니까? 비밀번호를 입력하세요.')
    if (!password) {
      return
    }
    const res = await fetch(`/api/comments/${category}/${current}`, {
      body: JSON.stringify({
        id,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
    if (res.ok) {
      refresh()
    } else {
      const { error } = await res.json()
      alert(error)
    }
  }

  useEffect(() => {
    setState('default')
  }, [content])

  if (state === 'edit') {
    return (
      <FormProvider>
        <Input
          doc={id}
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
    <SpeechBubble
      head={<span className={styles.name}>{name}</span>}
      word={content}
      onEdit={onEdit}
      onDelete={onDelete}
      needsAuth={false}
    />
  )
}
