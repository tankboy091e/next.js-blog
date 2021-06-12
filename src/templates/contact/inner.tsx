import { FormEvent, useEffect, useRef } from 'react'
import { useForm } from 'providers/form'
import styles from 'sass/templates/contact.module.scss'
import sendEmail from 'lib/util/send-email'

export default function ContactInner() {
  const nameRef = useRef<HTMLInputElement>()
  const emailRef = useRef<HTMLInputElement>()
  const messageRef = useRef<HTMLTextAreaElement>()

  const { setOptions } = useForm()

  useEffect(() => {
    setOptions({
      onSubmit: async (e: FormEvent<HTMLFormElement>) => {
        await sendEmail(e)
      },
      needToValidate: [nameRef, emailRef, messageRef],
      successDescription: 'Email has been sent successfully',
      failDescription: 'Failed to sent. Please fill out all required field.',
      transitionInterval: 1000 * 60 * 60,
      innerClassName: styles.inner,
      submitClassName: styles.submit,
    })
  }, [])

  return (
    <>
      <input
        className={styles.field}
        ref={nameRef}
        name="name"
        placeholder="Full Name"
      />
      <input
        className={styles.field}
        ref={emailRef}
        type="email"
        name="email"
        placeholder="Email Address"
      />
      <textarea
        className={styles.content}
        ref={messageRef}
        name="message"
        placeholder="hello,"
      />
    </>
  )
}
