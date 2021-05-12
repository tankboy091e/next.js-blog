import data from 'public/json/text.json'
import styles from 'sass/components/article.module.scss'

export default function Article() {
  const { title, content } = data
  return (
    <article className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p className={styles.content}>{content}</p>
      <time className={styles.date}>2021년 3월 16일</time>
    </article>
  )
}
