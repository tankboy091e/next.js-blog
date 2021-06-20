import Profile from 'components/profile'
import styles from 'sass/templates/about.module.scss'

export interface Data {
  introduce: string
}

export default function About({ data } : { data: Data}) {
  return (
    <section className={styles.container}>
      <Profile width={100} height={100} />
    </section>
  )
}
