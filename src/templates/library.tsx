import styles from 'sass/templates/library.module.scss'
import Book from 'widgets/book'

export default function Library() {
  let key = 0

  return (
    <div className={styles.container}>
      {[...Array(30)].map(() => {
        key += 1
        return <Book key={key} />
      })}
    </div>
  )
}
