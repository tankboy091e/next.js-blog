import Link from 'next/link'
import { useState } from 'react'
import styles from 'sass/widgets/book.module.scss'

export interface BookProps {
  title: string
  author: string
  pubDate: string
  publisher: string
  cover: string
  link: string
  isbn13: string
  itemPage: number
}

export default function Book({
  cover,
  itemPage = 100,
  isbn13,
}: {
  cover: string
  itemPage?: number
  isbn13: string,
}) {
  const processCovers = (): {
    front: string
    pageWidth: number
    back: string
  } => {
    const front = cover.replace('cover', 'cover500') as string
    const lastDot = cover.lastIndexOf('.') + 1
    const back = `${cover
      .replace('cover', 'letslook')
      .substring(0, lastDot + 1)}b${cover.substring(lastDot - 1)}`

    const pageWidth = Math.round(itemPage / 8)

    return {
      front,
      pageWidth,
      back,
    }
  }

  const { front, pageWidth, back: backSrc } = processCovers()

  const [backOption, setBackSrc] = useState({
    back: backSrc,
    onError: () => setBackSrc({
      back: front,
      onError: null,
    }),
  })

  const { back, onError } = backOption

  return (
    <Link href={`/quotes/${isbn13}`}>
      <a className={styles.container} href="404" target="_blank">
        <div className={styles.book}>
          <div>
            <img className={styles.front} src={front} alt="not found" />
            <div className={styles.paper} style={{ width: pageWidth }} />
            <img
              className={styles.back}
              src={back}
              alt="not found"
              style={{
                transform: `translateZ(-${pageWidth}px) rotateY(180deg)`,
              }}
              onError={onError}
            />
          </div>
        </div>
      </a>
    </Link>
  )
}
