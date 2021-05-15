import fetcher from 'lib/api/fetcher'
import { useAuth } from 'providers/auth'
import styles from 'sass/templates/quotes.module.scss'
import useSWR from 'swr'
import Book, { BookProps } from 'widgets/book'
import Modal from 'widgets/modal'
import AddButton from 'widgets/add-button'
import NewQuotes from 'templates/new-quotes'
import PageNotFound from 'templates/404'
import LoadingSection from 'templates/loading'
import BookDetails from 'widgets/book-details'

export default function Quotes({ isbn }: { isbn: string | string[] }) {
  const { user } = useAuth()

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
      <section>
        <div />
      </section>
      {user && (
        <Modal initializer={<AddButton />}>
          <NewQuotes isbn={isbn} />
        </Modal>
      )}
    </section>
  )
}
