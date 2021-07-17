import SectionHeader from 'components/comments/section-header'
import List, { Data } from 'components/list'
import styles from 'sass/templates/posts.module.scss'

export interface PostsData {
  sum: Data[]
  essais: Data[]
  dev: Data[]
}

export default function Posts({ data }: { data: PostsData }) {
  const { sum, essais, dev } = data
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <section className={styles.section}>
          <SectionHeader category="sum" />
          <List data={sum} category="sum" monthDivider={false} />
        </section>
        <section className={styles.section}>
          <SectionHeader category="dev" />
          <List data={dev} category="dev" monthDivider={false} />
        </section>
      </div>
      <section className={styles.section}>
        <SectionHeader category="essais" />
        <List data={essais} category="essais" monthDivider={false} />
      </section>
    </section>
  )
}
