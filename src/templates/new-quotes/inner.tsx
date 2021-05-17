import { useForm } from 'providers/form'
import { useEffect, useRef } from 'react'
import styles from 'sass/templates/new-quotes.module.scss'
import { useModal } from 'providers/modal/modal'

interface DefaultQuotesProps {
  isbn: string | string[]
  mutate?: Function
}

interface EditQuotesProps extends DefaultQuotesProps {
  id: string
  page: string
  paragraph: string
  callback?: () => void
}

export type NewQuotesProps = DefaultQuotesProps | EditQuotesProps

export default function NewQuotesInner({ value } : { value : NewQuotesProps }) {
  const { setOptions } = useForm()
  const { turnOff } = useModal()

  const pageRef = useRef<HTMLInputElement>()
  const paragraphRef = useRef<HTMLTextAreaElement>()
  const annotationRef = useRef<HTMLTextAreaElement>()

  const { isbn, mutate } = value

  const getResponse = () => {
    turnOff()
    mutate?.call(null)
    if ('id' in value) {
      value.callback?.call(null)
    }
  }

  useEffect(() => {
    if ('id' in value) {
      const { page, paragraph } = value
      pageRef.current.value = page
      paragraphRef.current.value = paragraph
    }

    const extraBody = 'id' in value ? { id: value.id } : { isbn }
    const method = 'id' in value ? 'PUT' : 'POST'

    setOptions({
      input: `/api/quotes/${isbn}`,
      init: () => ({
        body: JSON.stringify({
          ...extraBody,
          page: pageRef.current.value,
          paragraph: paragraphRef.current.value,
          annotation: annotationRef.current.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method,
      }),
      getResponse,
      needToValidate: [pageRef, paragraphRef],
      containerClassName: styles.formContainer,
      innerClassName: styles.inner,
      submitClassName: styles.submit,
    })
  }, [])

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
