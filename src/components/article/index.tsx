import { useEffect, useRef } from 'react'
import styles from 'sass/components/article/index.module.scss'
import Time from 'widgets/time'

export interface ArticleData {
  doc: string,
  title: string
  subtitle: string
  content: string
  footnote: string
  createdAt: string
}

export default function Article({ data }: { data: ArticleData }) {
  const {
    title, subtitle, content, footnote, createdAt,
  } = data
  const contentRef = useRef<HTMLElement>()
  const footnoteRef = useRef<HTMLElement>()

  const contentHTML = content
    .replace(/–{2,}/g, '⸻')
    .replace('<script>', '')
    .replace('<iframe>', '')

  const footnoteHTML = footnote
    ?.replace('<script>', '')
    .replace('<iframe>', '')

  const linkFootnotes = () => {
    if (!footnoteRef.current) {
      return
    }
    const noteList = footnoteRef.current.querySelectorAll('li')
    const supList = contentRef.current.querySelectorAll('sup')
    supList.forEach((sup) => {
      sup.addEventListener('click', () => {
        const index = parseInt(sup.innerText, 10)
        const linkedNote = noteList.item(index - 1)
        window.scrollTo({ top: linkedNote.offsetTop })
      })
    })
    noteList.forEach((node, index) => {
      node.querySelector('a')?.addEventListener('click', () => {
        // eslint-disable-next-line no-restricted-syntax
        for (const sup of supList) {
          if (parseInt(sup.innerText, 10) === index + 1) {
            window.scrollTo({ top: sup.offsetTop })
            break
          }
        }
      })
    })
  }

  useEffect(() => {
    linkFootnotes()
  }, [])

  return (
    <article className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && (<h2 className={styles.subtitle}>{subtitle}</h2>)}
      </div>
      <div className={styles.body}>
        <section
          className={styles.content}
          ref={contentRef}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: contentHTML }}
        />
        {footnote && (
          <section
            className={styles.footnote}
            ref={footnoteRef}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: footnoteHTML }}
          />
        )}
        <Time className={styles.date} timeStamp={createdAt} />
      </div>
    </article>
  )
}
