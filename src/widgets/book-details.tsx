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
      {author && <p className={styles.description}>{author}</p>}
      {translator && (
        <p className={styles.description}>{`${translator} 옮김`}</p>
      )}
      {editor && <p className={styles.description}>{`${editor} 엮음`}</p>}
      {publisher && <p className={styles.description}>{publisher}</p>}
      {pubDate && (
        <time className={styles.description}>{convertBookDate(pubDate)}</time>
      )}
    </>
  )
}
