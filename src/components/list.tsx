/* eslint-disable camelcase */
import { getDateArray } from 'lib/util/date'
import Link from 'next/link'
import { useAuth } from 'providers/auth'
import styles from 'sass/components/list.module.scss'
import Time from 'widgets/time'

export interface Data {
  title: string
  id: string
  created_at: string
}

export default function List({
  data,
  length,
  category,
  monthDivider = true,
}: {
  data: Data[],
  length?: number,
  category: string,
  monthDivider?: boolean
}) {
  const { user } = useAuth()
  const total = length || data.length
  return (
    <ol className={styles.container}>
      {user && (
        <li className={styles.doc}>
          <Link href={`/${category}/new`}>
            <a href={`/${category}/new`} className={styles.new}>+ New</a>
          </Link>
        </li>
      )}
      {data.slice(0, total).map(({ title, id: doc, created_at: createdAt }, index) => {
        const href = `/${category}/${doc}`
        const { month } = getDateArray(createdAt)
        const needMonth = monthDivider
          && index !== total - 1
          && month !== getDateArray(data[index + 1].created_at).month
        return (
          <li key={doc} className={styles.doc}>
            {needMonth && (
              <div className={styles.month}>
                {`${month}월`}
              </div>
            )}
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
