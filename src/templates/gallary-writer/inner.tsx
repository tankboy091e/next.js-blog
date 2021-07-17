import { useForm } from 'providers/form'
import { useEffect, useRef } from 'react'
import styles from 'sass/templates/gallary-writer.module.scss'
import { useModal } from 'components/modal'
import { NoteProps } from 'components/notes/note'

interface DefaultQuotesProps {
  library: string | string[]
  mutate?: Function
}

interface EditQuotesProps extends DefaultQuotesProps {
  callback?: () => void
}

export type NewQuotesProps = DefaultQuotesProps | (EditQuotesProps & NoteProps)

export default function GallaryWriterInner() {
  const { setOptions } = useForm()
  const { close } = useModal()

  const titleRef = useRef<HTMLInputElement>()
  const urlRef = useRef<HTMLInputElement>()
  const skillsRef = useRef<HTMLInputElement>()

  const getResponse = () => {
    close()
  }

  useEffect(() => {
    setOptions({
      input: '/gallary',
      init: () => ({
        body: JSON.stringify({
          title: titleRef.current.value,
          content: urlRef.current.value,
          footnote: skillsRef.current.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }),
      getResponse,
      needToValidate: [titleRef, urlRef],
      containerClassName: styles.formContainer,
      innerClassName: styles.inner,
      submitClassName: styles.submit,
    })
  }, [])

  return (
    <>
      <input
        className={styles.field}
        type="text"
        placeholder="title"
        name="title"
        autoComplete="off"
        ref={titleRef}
      />
      <input
        className={styles.field}
        type="text"
        placeholder="url"
        name="url"
        autoComplete="off"
        ref={urlRef}
      />
      <input
        className={styles.field}
        type="text"
        placeholder="skills"
        name="skills"
        autoComplete="off"
        ref={skillsRef}
      />
    </>
  )
}
