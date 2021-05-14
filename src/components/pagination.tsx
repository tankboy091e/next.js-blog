import styles from 'sass/components/pagination.module.scss'
import Link from 'next/link'

export default function Pagenation({
  category,
  current,
  total,
}: {
  category: string
  current: number
  total: number
}) {
  const prev = current > 1 ? current - 1 : null
  const next = current < total ? current + 1 : null

  return (
    <div className={styles.container}>
      {prev && (
        <Link href={`/${category}/${prev}`}>
          <a href="replace">이전</a>
        </Link>
      )}
      {next && (
        <Link href={`/${category}/${next}`}>
          <a href="replace">다음</a>
        </Link>
      )}
    </div>
  )
}
