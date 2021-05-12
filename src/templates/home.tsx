import Article from 'components/article'
import Comments from 'components/comments'
import Pagenation from 'components/pagination'
import styles from 'sass/templates/post.module.scss'

export default function Post() {
  return (
    <section className={styles.container}>
      <Article />
      <Comments />
      <Pagenation />
    </section>
  )
}
