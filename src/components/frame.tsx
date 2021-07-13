/* eslint-disable react/no-danger */
import YouTube from 'react-youtube'
import styles from 'sass/components/frame.module.scss'
import { ArticleData } from './article'

export default function Frame({ data }: { data: ArticleData }) {
  const { title, content, footnote } = data

  const getYoutubeId = () => {
    const divider = content.lastIndexOf('/')
    return content.substring(divider + 1)
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.caption}>{title}</h2>
      <div className={styles.iframe}>
        <YouTube
          videoId={getYoutubeId()}
          className={styles.video}
        />
      </div>
      <div className={styles.dependencyContainer}>
        {footnote.split(',').map((value) => (
          <div className={styles.dependency} key={value}>
            {value.trim()}
          </div>
        ))}
      </div>
    </section>
  )
}
