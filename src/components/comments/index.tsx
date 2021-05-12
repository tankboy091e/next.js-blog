import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from 'sass/components/comments/index.module.scss'
import Button from './button'
import Inner from './inner'

export default function Comments() {
  const router = useRouter()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(false)
  }, [router])

  return (
    <section className={styles.container}>
      <Button active={active} setActive={setActive} />
      {active && <Inner />}
    </section>
  )
}
