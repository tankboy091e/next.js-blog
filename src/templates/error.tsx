import styles from 'sass/templates/404.module.scss'

export default function ErrorSection() {
  return (
    <section className={styles.container}>
      <p className={styles.message}>Sorry, something went wrong.</p>
    </section>
  )
}
