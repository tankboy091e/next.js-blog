import { useForm } from 'providers/formProvider'
import React, { SetStateAction, useEffect, useRef } from 'react'
import styles from 'sass/components/librarian/search.module.scss'
import { GoSearch } from 'react-icons/go'

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
        const res = await fetch(`/api/books/search?value=${inputRef.current.value}`)
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
