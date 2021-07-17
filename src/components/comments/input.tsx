/* eslint-disable dot-notation */
import React, { useEffect, useRef } from 'react'
import styles from 'sass/components/comments/input.module.scss'
import { useForm } from 'providers/form'
import { useComments } from './inner'

export default function Input({
  article,
  id,
  name = '',
  password = '',
  content = '',
  nameDisabled = false,
  passwordDisabled = false,
  submitValue,
  method = 'POST',
}: {
  article?: number
  id?: number
  name?: string
  password?: string
  content?: string
  nameDisabled?: boolean
  passwordDisabled?: boolean
  submitValue?: string
  method?: string
}) {
  const { setOptions } = useForm()
  const { refresh } = useComments()
  const nameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const contentRef = useRef<HTMLTextAreaElement>()

  useEffect(() => {
    nameRef.current.value = name
    passwordRef.current.value = password
    contentRef.current.value = content

    const isEdit = id !== undefined

    const input = isEdit ? `/comment/${id}` : '/comment'

    setOptions({
      input,
      init: () => {
        const payload: {
          [key: string]: any
        } = {
          password: passwordRef.current.value,
          content: contentRef.current.value,
        }

        if (!isEdit) {
          payload['article'] = article
          payload['username'] = nameRef.current.value
        }

        return {
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
          method,
        }
      },
      needToValidate: [nameRef, passwordRef, contentRef],
      transitionInterval: 2000,
      getResponse: () => refresh(),
      submitValue,
      containerClassName: styles.formContainer,
      innerClassName: styles.formInner,
      submitClassName: styles.submit,
    })
  }, [id])

  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <input
          ref={nameRef}
          className={styles.headerField}
          disabled={nameDisabled}
          name="name"
          placeholder="name"
          maxLength={12}
        />
        <input
          ref={passwordRef}
          disabled={passwordDisabled}
          className={styles.headerField}
          name="password"
          type="password"
          placeholder="password"
          maxLength={25}
          autoComplete="off"
        />
      </section>
      <textarea
        ref={contentRef}
        className={styles.content}
        name="content"
        placeholder="comment ..."
        maxLength={1000}
      />
    </section>
  )
}
