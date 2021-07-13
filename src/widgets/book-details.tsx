import getAuthor from 'lib/util/author'
import { convertBookDate } from 'lib/util/date'
import styles from 'sass/widgets/book-details.module.scss'

export default function BookDetails({ value }: { value: any }) {
  const {
    title, author: authorQuery, publisher, pubDate,
  } = value
  const { author, translator, editor } = getAuthor(authorQuery)
  return (
    <>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.container}>
        {author && <span className={styles.description}>{author}</span>}
        {translator && (
          <span className={styles.description}>{`${translator} 옮김`}</span>
        )}
        {editor && <span className={styles.description}>{`${editor} 엮음`}</span>}
        {publisher && <span className={styles.description}>{publisher}</span>}
        {pubDate && (
          <time className={styles.description}>{convertBookDate(pubDate)}</time>
        )}
      </div>
    </>
  )
}
