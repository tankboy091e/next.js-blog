import usePageQuery from 'lib/hooks/page-query'
import { getDateArray } from 'lib/util/date'
import Link from 'next/link'
import styles from 'sass/components/list.module.scss'
import Time from 'widgets/time'

export interface Data {
  title: string
  doc: string
  createdAt: string
}

export default function List({
  data,
  length,
}: {
  data: Data[],
  length?: number,
}) {
  const { category } = usePageQuery()
  const total = length || data.length
  return (
    <ol className={styles.container}>
      {data.slice(0, total).map(({ title, doc, createdAt }, index) => {
        const href = `/${category}/${doc}`
        const { month } = getDateArray(createdAt)
        const needMonth = index !== total - 1
          && month !== getDateArray(data[index + 1].createdAt).month
        return (
          <li key={doc} className={styles.doc}>
            {needMonth && <div className={styles.month}>{`${month}월`}</div>}
            <Link href={href}>
              <a href={href} className={styles.inner}>
                <h3 className={styles.title}>{title}</h3>
                <Time className={styles.date} timeStamp={createdAt} />
              </a>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
