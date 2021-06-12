import styles from 'sass/templates/error-section.module.scss'
import ErrorMessage from 'widgets/error-message'

export default function ErrorSection({ message }: { message?: string }) {
  return (
    <section className={styles.container}>
      <ErrorMessage message={message} />
    </section>
  )
}
