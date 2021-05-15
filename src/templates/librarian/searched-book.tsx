import styles from 'sass/templates/librarian/searched-book.module.scss'
import { useLibrary } from 'templates/library'
import Book from 'widgets/book'
import BookDetails from 'widgets/book-details'
import { useModal } from 'providers/modal/modal'

export default function SearchedBook({ value }: { value: any }) {
  const {
    link, cover, isbn13, isbn, itemPage,
  } = value

  const { mutate } = useLibrary()
  const { turnOff } = useModal()

  const onClick = async () => {
    const res = await fetch('/api/books', {
      body: JSON.stringify({
        isbn: isbn13 || isbn,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    if (res.ok) {
      mutate()
      turnOff()
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
