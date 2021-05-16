import styles from 'sass/templates/librarian/searched-book.module.scss'
import { useLibrary } from 'templates/library'
import Book from 'widgets/book'
import BookDetails from 'widgets/book-details'
import { useModal } from 'providers/modal/modal'
import { useAlert } from 'providers/modal/alert'
import hermes from 'lib/api/hermes'

export default function SearchedBook({ value }: { value: any }) {
  const {
    link, cover, isbn13, isbn, itemPage,
  } = value

  const { createAlert } = useAlert()

  const { mutate } = useLibrary()
  const { turnOff } = useModal()

  const onClick = async () => {
    const res = await hermes('/api/books', {
      body: JSON.stringify({
        isbn: isbn13 || isbn,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    if (res.ok) {
      const { message } = await res.json()
      createAlert({
        message,
        code: 'success',
      })
      mutate()
      turnOff()
    } else {
      const { error } = await res.json()
      createAlert({
        message: error,
        code: 'error',
      })
    }
  }

  return (
    <button type="button" className={styles.container} onClick={onClick}>
      <div className={styles.showcase}>
        <Book link={link} cover={cover} itemPage={itemPage} />
      </div>
      <address className={styles.info}>
        <BookDetails value={value} />
      </address>
    </button>
  )
}
