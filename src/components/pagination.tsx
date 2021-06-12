import styles from 'sass/components/pagination.module.scss'
import Link from 'next/link'

export default function Pagenation({
  category,
  pid,
  total,
}: {
  category: string
  pid: string
  total: number
}) {
  const id = parseInt(pid, 10)
  const prev = id > 1 ? id - 1 : null
  const next = id < total ? id + 1 : null
  const prevHref = `/${category}${prev === 1 ? '' : `/${prev}`}`
  const nextHref = `/${category}/${next}`
  return (
    <section className={styles.container}>
      {prev && (
        <Link href={prevHref}>
          <a href={prevHref}>이전</a>
        </Link>
      )}
      {next && (
        <Link href={nextHref}>
          <a href={nextHref}>다음</a>
        </Link>
      )}
    </section>
  )
}
