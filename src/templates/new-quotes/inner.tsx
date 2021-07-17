/* eslint-disable dot-notation */
import { useForm } from 'providers/form'
import { useEffect, useRef } from 'react'
import styles from 'sass/templates/new-quotes.module.scss'
import { useModal } from 'components/modal'
import { NoteProps } from 'components/notes/note'

interface DefaultQuotesProps {
  library: number
  mutate?: Function
}

interface EditQuotesProps extends DefaultQuotesProps {
  callback?: () => void
}

export type NewQuotesProps = DefaultQuotesProps | (EditQuotesProps & NoteProps)

export default function NewQuotesInner({ value }: { value: NewQuotesProps }) {
  const { setOptions } = useForm()
  const { close } = useModal()

  const pageRef = useRef<HTMLInputElement>()
  const paragraphRef = useRef<HTMLTextAreaElement>()
  const annotationRef = useRef<HTMLTextAreaElement>()

  const { mutate } = value

  const getResponse = () => {
    close()
    mutate?.call(null)
    if ('id' in value) {
      value.callback?.call(null)
    }
  }

  useEffect(() => {
    if ('id' in value) {
      const { page, paragraph, annotation } = value
      pageRef.current.value = page
      paragraphRef.current.value = paragraph
      annotationRef.current.value = annotation
    }

    const isEdit = 'id' in value

    const input = 'id' in value ? `/quote/${value.id}` : '/quote'

    const method = isEdit ? 'PATCH' : 'POST'

    setOptions({
      input,
      init: () => {
        const payload = {
          page: pageRef.current.value,
          paragraph: paragraphRef.current.value,
          annotation: annotationRef.current.value,
        }

        if (!isEdit) {
          payload['library'] = value.library
        }

        return {
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
          method,
        }
      },
      getResponse,
      needToValidate: [pageRef, paragraphRef],
      containerClassName: styles.formContainer,
      innerClassName: styles.inner,
      submitClassName: styles.submit,
    })
  }, [value])

  return (
    <>
      <input
        className={styles.page}
        type="text"
        placeholder="page"
        name="page"
        autoComplete="off"
        ref={pageRef}
      />
      <textarea
        className={styles.paragraph}
        placeholder="paragraph"
        name="paragraph"
        ref={paragraphRef}
      />
      <textarea
        className={styles.paragraph}
        placeholder="annotation"
        name="annotation"
        ref={annotationRef}
      />
    </>
  )
}
