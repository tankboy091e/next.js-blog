/* eslint-disable react/no-danger */
import { useState } from 'react'
import styles from 'sass/components/notes.module.scss'
import NewQuotes from 'templates/new-quotes'
import Modal from 'components/modal'
import SpeechBubble from 'widgets/speech-bubble'
import { useAlert } from 'providers/dialog/alert/inner'
import { useConfirm } from 'providers/dialog/confirm/inner'
import hermes from 'lib/api/hermes'

export interface NoteProps {
  id: string
  page: string
  paragraph: string
  annotation: string
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
  const {
    id, page, paragraph, annotation,
  } = value
  const label = page.includes('-') ? 'pp' : 'p'
  const [state, setState] = useState<NoteState>('default')

  const { createConfirm } = useConfirm()
  const { createAlert } = useAlert()

  const onEdit = async () => {
    setState('edit')
  }

  const onDelete = async () => {
    const confirm = await createConfirm({
      title: '주의',
      text: '정말 삭제하시겠습니까?',
    })
    if (!confirm) {
      return
    }
    const res = await hermes(`/api/quotes/${isbn}`, {
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })

    if (res.ok) {
      const { message } = await res.json()
      createAlert({
        text: message,
        title: 'success',
      })
      mutate()
    } else {
      const { error } = await res.json()
      createAlert({
        title: 'error',
        text: error,
      })
    }
  }

  const onOff = () => {
    setState('default')
  }

  if (state === 'edit') {
    return (
      <Modal immediate onClose={onOff}>
        <NewQuotes
          isbn={isbn}
          id={id}
          page={page}
          paragraph={paragraph}
          annotation={annotation}
          callback={onOff}
          mutate={mutate}
        />
      </Modal>
    )
  }

  return (
    <SpeechBubble
      key={paragraph}
      head={<span className={styles.page}>{`${label}.${page}`}</span>}
      body={
        (
          <>
            <q
              className={styles.paragraph}
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\n/g, '<br/>'),
              }}
            />
            {annotation && (
              <details className={styles.details}>
                <summary className={styles.summary}>메모</summary>
                <hr className={styles.divider} />
                <p className={styles.annotation}>{annotation}</p>
              </details>
            )}
          </>
        )
      }
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}
