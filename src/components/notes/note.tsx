import { useState } from 'react'
import styles from 'sass/components/notes.module.scss'
import NewQuotes from 'templates/new-quotes'
import Modal from 'widgets/modal'
import SpeechBubble from 'widgets/speech-bubble'

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

  const onEdit = async () => {
    setState('edit')
  }

  const onDelete = async () => {
    const isSure = window.confirm('정말 삭제하시겠습니까?')
    if (!isSure) {
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
      alert(error)
    }
  }

  const onEditCallback = () => {
    setState('default')
  }

  if (state === 'edit') {
    return (
      <Modal immediate>
        <NewQuotes
          isbn={isbn}
          id={id}
          page={page}
          paragraph={paragraph}
          callback={onEditCallback}
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
