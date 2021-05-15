import fetcher from 'lib/api/fetcher'
import styles from 'sass/templates/quotes.module.scss'
import useSWR from 'swr'
import Book, { BookProps } from 'widgets/book'
import PageNotFound from 'templates/404'
import LoadingSection from 'templates/loading'
import BookDetails from 'widgets/book-details'
import Notes from '../components/notes'

export default function Quotes({ isbn }: { isbn: string | string[] }) {
  const { data, error } = useSWR<BookProps>(`/api/books/${isbn}`, fetcher)

  if (error) {
    return <PageNotFound />
  }

  if (!data) {
    return <LoadingSection />
  }
  const {
    itemPage, cover, link,
  } = data

  if (!cover) {
    return <PageNotFound />
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.window}>
          <Book link={link} cover={cover} itemPage={itemPage} />
        </div>
        <address className={styles.info}>
          <BookDetails value={data} />
        </address>
      </header>
      <Notes isbn={isbn} />
    </section>
  )
}
