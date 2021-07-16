import styles from 'sass/templates/library.module.scss'
import { useAuth } from 'providers/auth'
import Modal from 'components/modal'
import useSWR from 'swr'
import fetcher from 'lib/api/fetcher'
import Book, { BookProps } from 'widgets/book'
import AddButton from 'widgets/add-button'
import {
  createContext, useContext,
} from 'react'
import Librarian from './librarian'

interface LibraryContextProps {
  mutate: Function,
}

const LibraryContext = createContext<LibraryContextProps>(null)

export const useLibrary = () => useContext(LibraryContext)

export default function Library() {
  const { user } = useAuth()

  const { data, mutate } = useSWR<BookProps[]>(`${process.env.API_URL}/library`, fetcher)

  const value = {
    mutate,
  }

  return (
    <LibraryContext.Provider value={value}>
      <section className={styles.container}>
        {user && (
          <Modal initializer={<AddButton />}>
            <Librarian />
          </Modal>
        )}
        <h1 className={styles.header}>Library</h1>
        <section className={styles.bookcase}>
          {data && data.map((value) => {
            const {
              id, cover, itemPage,
            } = value
            return (
              <div key={id} className={styles.wrapper}>
                <Book cover={cover} itemPage={itemPage} link={`/library/${id}`} />
              </div>
            )
          })}
        </section>
      </section>
    </LibraryContext.Provider>
  )
}
