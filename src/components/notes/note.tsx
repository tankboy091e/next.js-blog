import { useState } from 'react'
import styles from 'sass/components/notes.module.scss'
import NewQuotes from 'templates/new-quotes'
import Modal from 'providers/modal/modal'
import SpeechBubble from 'widgets/speech-bubble'
import { useAlert } from 'providers/modal/alert'
import { useConfirm } from 'providers/modal/confirm'

export interface NoteProps {
  id: string
  page: string
  paragraph: string
}

type NoteState = 'default' | 'edit'

export default function Note({
  isbn,
  mutate,
  value,
}: {
  isbn: string | string[]
  mutate: Function
  value: NoteProps
}) {
  const { id, page, paragraph } = value
  const label = page.includes('-') ? 'pp' : 'p'
  const [state, setState] = useState<NoteState>('default')

  const { createConfirm } = useConfirm()
  const { createAlert } = useAlert()

  const onEdit = async () => {
    setState('edit')
  }

  const onDelete = async () => {
    const confirm = await createConfirm({
      message: '정말 삭제하시겠습니까',
      code: '주의',
    })
    if (!confirm) {
      return
    }
    const res = await fetch(`/api/quotes/${isbn}`, {
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })

    if (res.ok) {
      mutate()
    } else {
      const { error } = await res.json()
      createAlert({
        message: error,
        code: 'error',
      })
    }
  }

  const callback = () => {
    setState('default')
  }

  if (state === 'edit') {
    return (
      <Modal immediate off={callback}>
        <NewQuotes
          isbn={isbn}
          id={id}
          page={page}
          paragraph={paragraph}
          callback={callback}
          mutate={mutate}
        />
      </Modal>
    )
  }

  return (
    <SpeechBubble
      key={paragraph}
      head={<p className={styles.page}>{`${label}.${page}`}</p>}
      word={paragraph}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}
