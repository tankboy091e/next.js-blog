import { useForm } from 'providers/form'
import { useEffect, useRef } from 'react'
import styles from 'sass/templates/new-quotes.module.scss'
import { useModal } from 'widgets/modal'

export default function Inner({ isbn }: { isbn: string | string[] }) {
  const { setOptions } = useForm()
  const pageRef = useRef<HTMLInputElement>()
  const paragraphRef = useRef<HTMLTextAreaElement>()

  const { turnOff } = useModal()

  const getResponse = () => {
    turnOff()
  }

  useEffect(() => {
    setOptions({
      input: '/api/quotes',
      init: () => ({
        body: JSON.stringify({
          isbn,
          page: pageRef.current.value,
          paragraph: paragraphRef.current.value,
        }),
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
        type="number"
        placeholder="page"
        name="page"
        ref={pageRef}
      />
      <textarea
        className={styles.paragraph}
        placeholder="paragraph"
        name="paragraph"
        ref={paragraphRef}
      />
    </>
  )
}
