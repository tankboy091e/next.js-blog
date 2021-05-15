import styles from 'sass/templates/library.module.scss'
import { useAuth } from 'providers/auth'
import Modal from 'widgets/modal'
import Librarian from 'templates/librarian'
import useSWR from 'swr'
import fetcher from 'lib/api/fetcher'
import Book, { BookProps } from 'widgets/book'
import LoadingSection from 'templates/loading'
import ErrorSection from 'templates/error'
import AddButton from 'widgets/add-button'

export default function Library() {
  const { user } = useAuth()

  const { data, error } = useSWR<BookProps[]>('/api/books', fetcher)

  if (error) {
    return <ErrorSection />
  }

  if (!data) {
    return <LoadingSection />
  }

  return (
    <div className={styles.container}>
      {user && (
        <Modal initializer={<AddButton />}>
          <Librarian />
        </Modal>
      )}
      <section className={styles.bookcase}>
        {data.map((value) => {
          const {
            id, cover, itemPage,
          } = value
          return <Book key={id} cover={cover} itemPage={itemPage} link={`/quotes/${id}`} />
        })}
      </section>
    </div>
  )
}
