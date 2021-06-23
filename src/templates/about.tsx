import Profile from 'components/profile'
import styles from 'sass/templates/about.module.scss'
import Link from 'next/link'

export interface Data {
  introduce: string
}

export default function About({ data } : { data: Data}) {
  return (
    <section className={styles.container}>
      <Link href="/contact">
        <a href="/contact">
          <Profile width={100} height={100} />
        </a>
      </Link>
    </section>
  )
}
