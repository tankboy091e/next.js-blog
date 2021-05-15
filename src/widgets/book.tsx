/* eslint-disable react/jsx-no-target-blank */
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
  id: string
  itemPage: number
}

export default function Book({
  cover,
  itemPage = 100,
  link,
}: {
  cover: string
  itemPage?: number
  link: string
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
    <Link href={link}>
      <a
        className={styles.container}
        href={link}
        target={link.includes('http') ? '_blank' : '_self'}
        rel={link.includes('http') ? 'noreferrer' : ''}
      >
        <figure className={styles.figure}>
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
        </figure>
      </a>
    </Link>
  )
}
