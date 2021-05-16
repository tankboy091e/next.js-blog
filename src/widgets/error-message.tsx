import styles from 'sass/widgets/error-message.module.scss'

export default function ErrorMessage({
  message = 'Sorry, something went wrong',
}: {
  message?: string
}) {
  return <p className={styles.message}>{message}</p>
}
