import styles from 'sass/templates/library.module.scss'
import { useAuth } from 'providers/auth'
import Modal from 'components/modal'
import Book from 'widgets/book'
import AddButton from 'widgets/add-button'
import {
  createContext, useContext, useState,
} from 'react'
import communicate from 'lib/api'
import Librarian from './librarian'

interface LibraryContextProps {
  mutate: Function,
}

const LibraryContext = createContext<LibraryContextProps>(null)

export const useLibrary = () => useContext(LibraryContext)

export default function Library({ data } : { data: any[]}) {
  const { user } = useAuth()

  const [books, setBooks] = useState<any[]>(data)

  const mutate = async () => {
    const res = await communicate('/library')

    if (res.status !== 200) {
      return
    }

    const data = await res.json()

    setBooks(data)
  }

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
          {books && books.map((value) => {
            const {
              id, cover, page,
            } = value
            return (
              <div key={id} className={styles.wrapper}>
                <Book cover={cover} page={page} link={`/library/${id}`} />
              </div>
            )
          })}
        </section>
      </section>
    </LibraryContext.Provider>
  )
}
