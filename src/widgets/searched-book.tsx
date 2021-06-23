import styles from 'sass/templates/librarian/searched-book.module.scss'
import { useLibrary } from 'templates/library'
import Book from 'widgets/book'
import BookDetails from 'widgets/book-details'
import { useModal } from 'components/modal'
import { useAlert } from 'providers/dialog/alert/inner'
import hermes from 'lib/api/hermes'

export default function SearchedBook({ value }: { value: any }) {
  const {
    link, cover, isbn13, isbn, itemPage,
  } = value

  const { createAlert } = useAlert()

  const { mutate } = useLibrary()
  const { close } = useModal()

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
        title: 'success',
        text: message,
      })
      mutate()
      close()
    } else {
      const { error } = await res.json()
      createAlert({
        text: 'error',
        title: error,
      })
    }
  }

  return (
    <button type="button" className={styles.container} onClick={onClick}>
      <section className={styles.showcase}>
        <Book link={link} cover={cover} itemPage={itemPage} />
      </section>
      <address className={styles.info}>
        <BookDetails value={value} />
      </address>
    </button>
  )
}
