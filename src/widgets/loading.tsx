import styles from 'sass/widgets/loading.module.scss'

export default function Loading({
  size = 16,
}: {
  size? : number
}) {
  return (
    <div className={styles.container}>
      <div className={styles.child} style={{ width: size, height: size }} />
      <div className={styles.child} style={{ width: size, height: size }} />
      <div className={styles.child} style={{ width: size, height: size }} />
    </div>
  )
}
