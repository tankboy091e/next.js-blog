import SectionHeader from 'components/comments/section-header'
import List, { Data } from 'components/list'
import styles from 'sass/templates/posts.module.scss'

export default function Posts({ data }: { data: Data[][] }) {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <section className={styles.section}>
          <SectionHeader category="sum" />
          <List data={data[0]} category="sum" monthDivider={false} />
        </section>
        <section className={styles.section}>
          <SectionHeader category="dev" />
          <List data={data[2]} category="dev" monthDivider={false} />
        </section>
      </div>
      <section className={styles.section}>
        <SectionHeader category="essais" />
        <List data={data[1]} category="essais" monthDivider={false} />
      </section>
    </section>
  )
}
