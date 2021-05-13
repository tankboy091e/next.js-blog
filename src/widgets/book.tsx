import fetcher from 'lib/util/fetcher'
import Link from 'next/link'
import styles from 'sass/widgets/book.module.scss'
import useSWR from 'swr'

interface BookData {
  title: string,
  author: string,
  pubdate: string,
  publisher: string,
  cover: string,
}

export default function Book({
  alt = 'not found',
  ISBN,
}: {
  alt?: string
  ISBN: number
}) {
  const url = `https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=ttbtankboy09132120001&itemIdType=ISBN&ItemId=${ISBN}&output=JS&Version=20131101`
  const { data } = useSWR<BookData>(url, fetcher)

  if (!data) {
    return <></>
  }

  console.log(data)
  const { cover: coverSrc } = data
  return (
    <Link href="/">
      <a
        href="replace"
        className={styles.container}
      >
        <img className={styles.image} src={coverSrc} alt={alt} />
      </a>
    </Link>
  )
}
