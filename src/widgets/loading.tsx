import styles from 'sass/widgets/loading.module.scss'

export default function Loading({
  size = 16,
}: {
  size? : number
}) {
  return (
    <section className={styles.container}>
      <i className={styles.child} style={{ width: size, height: size }} />
      <i className={styles.child} style={{ width: size, height: size }} />
      <i className={styles.child} style={{ width: size, height: size }} />
    </section>
  )
}
