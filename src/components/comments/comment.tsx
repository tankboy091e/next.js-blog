import React, { useEffect, useState } from 'react'
import styles from 'sass/components/comments/comment.module.scss'
import SpeechBubble from 'widgets/speech-bubble'
import FormProvider from 'providers/form'
import hermes from 'lib/api/hermes'
import usePageQuery from 'lib/hooks/page-query'
import { usePrompt } from 'providers/modal/prompt'
import { useAlert } from 'providers/modal/alert'
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

  const { createPrompt } = usePrompt()
  const { createAlert } = useAlert()

  const onEdit = async () => {
    const password = await createPrompt({
      message: '비밀번호를 입력하세요',
      type: 'password',
    })
    if (!password) {
      return
    }
    const res = await hermes('/api/comments/validate', {
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
      createAlert({
        message: error,
        code: 'error',
      })
    }
  }

  const onDelete = async () => {
    const password = await createPrompt({
      message: '비밀번호를 입력하세요',
      code: '주의',
      type: 'password',
    })
    if (!password) {
      return
    }
    const res = await hermes(`/api/comments/${category}/${current}`, {
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
      const { message } = await res.json()
      createAlert({
        message,
        code: 'success',
      })
      refresh()
    } else {
      const { error } = await res.json()
      createAlert({
        message: error,
        code: 'error',
      })
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
