import Link from 'next/link'
import { DEFAULT_TITLE } from 'pages/_app'
import styles from 'sass/components/title.module.scss'

export default function Title() {
  return (
    <Link href="/">
      <a href="/" className={styles.link}>
        <h1>{DEFAULT_TITLE}</h1>
      </a>
    </Link>
  )
}
