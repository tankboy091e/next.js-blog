import Link from 'next/link'
import styles from 'sass/components/section-header.module.scss'

export default function SectionHeader({ category }: { category: string }) {
  return (
    <>
      <Link href={`/${category}`}>
        <a href={`/${category}`} className={styles.header}>
          <h2 className={styles.title}>{category}</h2>
        </a>
      </Link>
    </>
  )
}
