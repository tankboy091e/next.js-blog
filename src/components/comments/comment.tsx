import React, { useEffect, useState } from 'react'
import styles from 'sass/components/comments/comment.module.scss'
import SpeechBubble from 'widgets/speech-bubble'
import FormProvider from 'providers/form'
import { usePrompt } from 'providers/dialog/prompt/inner'
import { useAlert } from 'providers/dialog/alert/inner'
import communicate from 'lib/api'
import Input from './input'
import { useComments } from './inner'

type commentState = 'default' | 'edit' | 'pending'

export interface commentData {
  id: number
  username: string
  content: string
  createdAt: string
}

export default function Comment({ data }: { data: commentData }) {
  const { id, username, content } = data
  const [state, setState] = useState<commentState>()
  const [password, setPassword] = useState(null)
  const { refresh } = useComments()

  const { createPrompt } = usePrompt()
  const { createAlert } = useAlert()

  const onEdit = async () => {
    const password = await createPrompt({
      text: '비밀번호를 입력하세요',
      type: 'password',
    })
    if (!password) {
      return
    }
    const res = await communicate('/comment/validate', {
      payload: {
        id,
        password,
      },
      method: 'POST',
    })
    if (res.ok) {
      setPassword(password)
      setState('edit')
    } else {
      const { error } = await res.json()
      await createAlert({
        title: 'error',
        text: error,
      })
    }
  }

  const onDelete = async () => {
    const password = await createPrompt({
      title: '주의',
      text: '비밀번호를 입력하세요',
      type: 'password',
    })
    if (!password) {
      return
    }
    const res = await communicate(`/comment/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      await createAlert({
        title: 'success',
        text: 'request successed',
      })
      refresh()
    } else {
      const { message } = await res.json()
      await createAlert({
        title: 'error',
        text: message,
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
          id={id}
          method="PUT"
          submitValue="Edit"
          name={username}
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
      head={<span className={styles.name}>{username}</span>}
      body={content}
      onEdit={onEdit}
      onDelete={onDelete}
      needsAuth={false}
    />
  )
}
