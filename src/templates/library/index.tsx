import styles from 'sass/templates/library.module.scss'
import { GoPlus } from 'react-icons/go'
import { useAuth } from 'providers/authProvider'
import Modal from 'providers/modalProvider/modal'
import Librarian from 'components/librarian'
import useSWR from 'swr'
import fetcher from 'lib/api/fetcher'
import Book, { BookProps } from 'widgets/book'

export default function Library() {
  // let key = 0
  const { user } = useAuth()

  const { data, error } = useSWR<BookProps[]>('/api/books', fetcher)

  if (error) {
    return <></>
  }

  if (!data) {
    return <></>
  }

  return (
    <div className={styles.container}>
      {user && (
        <Modal initializer={<GoPlus size={40} className={styles.addButton} />}>
          <Librarian />
        </Modal>
      )}
      <section className={styles.bookcase}>
        {data.map((value) => {
          const {
            isbn13, cover, itemPage,
          } = value
          return <Book key={isbn13} cover={cover} itemPage={itemPage} isbn13={isbn13} />
        })}
      </section>
    </div>
  )
}
