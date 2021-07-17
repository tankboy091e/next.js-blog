import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from 'sass/components/comments/index.module.scss'
import Button from './button'
import Inner from './inner'

export default function Comments({
  article,
  data,
  sideWidget,
} : {
  article: number,
  data: any
  sideWidget?: React.ReactChild
}) {
  const router = useRouter()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(false)
  }, [router])

  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <Button active={active} setActive={setActive} />
        {sideWidget}
      </section>
      {active && (
        <section className={styles.body}>
          <Inner article={article} data={data} />
        </section>
      )}
    </section>
  )
}
