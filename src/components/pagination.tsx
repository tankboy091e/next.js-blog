import styles from 'sass/components/pagination.module.scss'
import Link from 'next/link'

export default function Pagenation() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a href="replace">이전</a>
      </Link>
      <Link href="/">
        <a href="replace">다음</a>
      </Link>
    </div>
  )
}
