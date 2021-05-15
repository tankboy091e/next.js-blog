import styles from 'sass/templates/404.module.scss'
import ErrorMessage from 'widgets/error-message'

export default function ErrorSection() {
  return (
    <section className={styles.container}>
      <ErrorMessage />
    </section>
  )
}
