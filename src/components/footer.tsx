import Link from 'next/link'
import styles from 'sass/components/footer.module.scss'

export default function Footer() {
  const copyright = `ⓒ 2019-${new Date().getFullYear()}. 오진수 all rights reserved`
  return (
    <footer className={styles.container}>
      <Link href="/">
        <a href="/" className={styles.home}>Home</a>
      </Link>
      <span className={styles.copyright}>{copyright}</span>
    </footer>
  )
}
