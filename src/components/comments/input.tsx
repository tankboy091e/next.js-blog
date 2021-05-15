import React, { useEffect, useRef } from 'react'
import usePageQuery from 'lib/hooks/page-query'
import styles from 'sass/components/comments/input.module.scss'
import { useForm } from 'providers/form'
import { useComments } from './inner'

export default function Input({
  doc,
  name = '',
  password = '',
  content = '',
  nameDisabled = false,
  passwordDisabled = false,
  submitValue,
  method = 'POST',
}: {
  doc: string
  name?: string
  password?: string
  content?: string
  nameDisabled?: boolean
  passwordDisabled?: boolean
  submitValue?: string
  method?: string
}) {
  const { category, current } = usePageQuery()
  const { setOptions } = useForm()
  const { refresh } = useComments()
  const nameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const contentRef = useRef<HTMLTextAreaElement>()

  useEffect(() => {
    nameRef.current.value = name
    passwordRef.current.value = password
    contentRef.current.value = content

    setOptions({
      input: `/api/comments/${category}/${current}`,
      init: () => ({
        body: JSON.stringify({
          doc,
          name: nameRef.current.value,
          password: passwordRef.current.value,
          content: contentRef.current.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method,
      }),
      needToValidate: [nameRef, passwordRef, contentRef],
      transitionInterval: 2000,
      getResponse: () => refresh(),
      submitValue,
      containerClassName: styles.formContainer,
      innerClassName: styles.formInner,
      submitClassName: styles.submit,
    })
  }, [])

  return (
    <section className={styles.container}>
      <header className={styles.header}>
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
      </header>
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
