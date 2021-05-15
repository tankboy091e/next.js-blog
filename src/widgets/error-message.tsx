import styles from 'sass/widgets/error-message.module.scss'

export default function ErrorMessage() {
  return <p className={styles.message}>Sorry, something went wrong.</p>
}
