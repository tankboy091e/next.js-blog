import styles from 'sass/templates/quotes.module.scss'
import Book from 'widgets/book'
import BookDetails from 'widgets/book-details'
import useImageLoad from 'lib/hooks/image-load'
import Notes from 'components/notes'
import Link from 'next/link'
import ErrorSection from './error-section'

export default function Quotes({ data } : { data : any}) {
  const { load, onImageLoad } = useImageLoad(1)

  const {
    isbn, itemPage, cover, link,
  } = data

  if (!cover) {
    return <ErrorSection />
  }

  return (
    <>
      <section className={styles.container}>
        <header className={styles.header}>
          <section className={styles.window}>
            <Book link={link} cover={cover} itemPage={itemPage} onload={onImageLoad} />
          </section>
          <address className={styles.info}>
            <BookDetails value={data} />
          </address>
        </header>
        {load && <Notes isbn={isbn} />}
      </section>
      <Link href="/library">
        <a href="/library" className={styles.back}>Library</a>
      </Link>
    </>
  )
}
