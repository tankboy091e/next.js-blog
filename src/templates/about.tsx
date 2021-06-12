import styles from 'sass/templates/about.module.scss'

export interface Data {
  introduce: string
}

export default function About({ data } : { data: Data}) {
  const { introduce } = data
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>about</h2>
      <p className={styles.introduce}>{introduce}</p>
    </section>
  )
}
