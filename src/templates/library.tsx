import styles from 'sass/templates/library.module.scss'
import { useAuth } from 'providers/auth'
import Modal from 'providers/modal/modal'
import Librarian from 'templates/librarian'
import useSWR from 'swr'
import fetcher from 'lib/api/fetcher'
import Book, { BookProps } from 'widgets/book'
import LoadingSection from 'templates/loading'
import ErrorSection from 'templates/error-section'
import AddButton from 'widgets/add-button'
import { createContext, useContext } from 'react'

interface LibraryContextProps {
  mutate: Function,
}

const LibraryContext = createContext<LibraryContextProps>(null)

export const useLibrary = () => useContext(LibraryContext)

export default function Library() {
  const { user } = useAuth()

  const { data, error, mutate } = useSWR<BookProps[]>('/api/books', fetcher)

  if (error) {
    return <ErrorSection />
  }

  if (!data) {
    return <LoadingSection />
  }

  const value = {
    mutate,
  }

  return (
    <LibraryContext.Provider value={value}>
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
    </LibraryContext.Provider>
  )
}
