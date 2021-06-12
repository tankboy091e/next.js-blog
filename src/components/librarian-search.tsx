import { useForm } from 'providers/form'
import React, { SetStateAction, useEffect, useRef } from 'react'
import styles from 'sass/templates/librarian/search.module.scss'
import { GoSearch } from 'react-icons/go'
import hermes from 'lib/api/hermes'

export default function Search({
  setData,
} : {
  setData: React.Dispatch<SetStateAction<any>>
}) {
  const { setOptions } = useForm()
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    setOptions({
      onSubmit: async () => {
        const res = await hermes(`/api/books/search?value=${inputRef.current.value}`)
        const data = await res.json()
        setData(data)
      },
      needToValidate: [inputRef],
      transitionInterval: 0,
      containerClassName: styles.container,
      innerClassName: styles.inner,
      submitClassName: styles.submit,
      submitValue: <GoSearch size={28} />,
    })
  }, [])

  return <input className={styles.input} type="text" ref={inputRef} name="search field" />
}
