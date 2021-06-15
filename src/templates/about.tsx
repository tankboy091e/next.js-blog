import styles from 'sass/templates/about.module.scss'
import SpeechBubble from 'widgets/speech-bubble'

export interface Data {
  introduce: string
}

export default function About({ data } : { data: Data}) {
  const { introduce } = data
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>about</h2>
      <SpeechBubble body={<p>{introduce}</p>} />
    </section>
  )
}
