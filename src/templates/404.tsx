import styles from 'sass/templates/404.module.scss'

export default function PageNotFound() {
  return (
    <section className={styles.container}>
      <p className={styles.message}>Page not found</p>
    </section>
  )
}
