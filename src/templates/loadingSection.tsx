import Loading from 'widgets/loading'
import styles from 'sass/templates/loadingSection.module.scss'

export default function LoadingSection() {
  return (
    <section className={styles.container}>
      <Loading />
    </section>
  )
}
