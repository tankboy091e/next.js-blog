import { convertTimestamp } from 'lib/util/date'
import styles from 'sass/components/article/index.module.scss'

export interface ArticleData {
  doc: string,
  title: string
  subtitle: string
  content: string
  createdAt: string
}

export default function Article({ data }: { data: ArticleData }) {
  const {
    title, subtitle, content, createdAt,
  } = data

  const __html = content.replace(/–{2,}/g, '⸻').replace('<script>', '').replace('<iframe>', '')

  return (
    <article className={styles.container}>
      <p className={styles.title}>{title}</p>
      {subtitle && (<p className={styles.subtitle}>{subtitle}</p>)}
      <p
        id="articleContent"
        className={styles.content}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html }}
      />
      <time className={styles.date}>{convertTimestamp(createdAt)}</time>
    </article>
  )
}