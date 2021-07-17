import styles from 'sass/templates/librarian/searched-book.module.scss'
import { useLibrary } from 'templates/library'
import Book from 'widgets/book'
import BookDetails from 'widgets/book-details'
import { useModal } from 'components/modal'
import { useAlert } from 'providers/dialog/alert/inner'
import communicate from 'lib/api'

export default function SearchedBook({ value }: { value: any }) {
  const {
    link, cover, isbn13, isbn, itemPage,
  } = value

  const { createAlert } = useAlert()

  const { mutate } = useLibrary()
  const { close } = useModal()

  const onClick = async () => {
    const res = await communicate('/book', {
      payload: {
        isbn: isbn13 || isbn,
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
    <section className={styles.container}>
      <button className={styles.showcase} type="button" onClick={onClick}>
        <Book link={link} cover={cover} itemPage={itemPage} />
      </button>
      <address className={styles.info}>
        <BookDetails value={value} />
      </address>
    </section>
  )
}
