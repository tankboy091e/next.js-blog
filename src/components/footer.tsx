import usePageQuery from 'lib/hooks/page-query'
import Link from 'next/link'
import styles from 'sass/components/footer.module.scss'

export default function Footer() {
  const copyright = `ⓒ 2019-${new Date().getFullYear()}. 오진수 all rights reserved`
  const { category } = usePageQuery()
  return (
    <footer className={styles.container}>
      {category !== 'home' && (
        <Link href="/">
          <a href="/" className={styles.home}>Home</a>
        </Link>
      )}
      <span className={styles.copyright}>{copyright}</span>
    </footer>
  )
}
