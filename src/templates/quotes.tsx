import fetcher from 'lib/api/fetcher'
import styles from 'sass/templates/quotes.module.scss'
import useSWR from 'swr'
import Book, { BookProps } from 'widgets/book'
import LoadingSection from 'templates/loading'
import BookDetails from 'widgets/book-details'
import useImageLoad from 'lib/hooks/image-load'
import Notes from 'components/notes'
import ErrorSection from './error-section'

export default function Quotes({ isbn }: { isbn: string | string[] }) {
  const { data, error } = useSWR<BookProps>(`/api/books/${isbn}`, fetcher)

  const { load, onImageLoad } = useImageLoad(1)

  if (error) {
    return <ErrorSection />
  }

  if (!data) {
    return <LoadingSection />
  }

  const {
    itemPage, cover, link,
  } = data

  if (!cover) {
    return <ErrorSection />
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <section className={styles.window}>
          <Book link={link} cover={cover} itemPage={itemPage} onload={onImageLoad} />
        </section>
        {load && (
          <address className={styles.info}>
            <BookDetails value={data} />
          </address>
        )}
      </header>
      {load && <Notes isbn={isbn} />}
    </section>
  )
}
