import styles from 'sass/components/article/index.module.scss'
import Time from 'widgets/time'

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

  const __html = content
    .replace(/–{2,}/g, '⸻')
    .replace('<script>', '')
    .replace('<iframe>', '')

  return (
    <article className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && (<h2 className={styles.subtitle}>{subtitle}</h2>)}
      <section
        id="articleContent"
        className={styles.content}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html }}
      />
      <Time className={styles.date} timeStamp={createdAt} />
    </article>
  )
}
