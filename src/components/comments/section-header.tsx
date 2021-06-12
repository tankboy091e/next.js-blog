import Divider from 'widgets/divider'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Link from 'next/link'
import styles from 'sass/components/section-header.module.scss'

export default function SectionHeader({ category }: { category: string }) {
  return (
    <>
      <Link href={`/${category}`}>
        <a href={`/${category}`} className={styles.header}>
          <h2 className={styles.title}>{category}</h2>
          <MdKeyboardArrowRight size={20} />
        </a>
      </Link>
      <Divider />
    </>
  )
}
