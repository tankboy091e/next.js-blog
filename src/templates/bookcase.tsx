import SectionHeader from 'components/comments/section-header'
import styles from 'sass/templates/bookcase.module.scss'
import Book from 'widgets/book'

interface Data {
  id: string,
  cover: string,
  itemPage: number,
}

export default function Bookcase({ data } : { data: Data[]}) {
  return (
    <section className={styles.container}>
      <SectionHeader category="library" />
      <section className={styles.window}>
        {data.map(({ id, cover, itemPage }) => (
          <div key={id} className={styles.case}>
            <Book cover={cover} itemPage={itemPage} link={`/library/${id}`} tilt />
          </div>
        ))}
      </section>
    </section>
  )
}
