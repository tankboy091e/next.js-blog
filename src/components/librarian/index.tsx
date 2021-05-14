import FormProvider from 'providers/formProvider'
import { useState } from 'react'
import styles from 'sass/components/librarian/index.module.scss'
import Search from './search'
import Select from './select'

export default function Librarian() {
  const [searchData, setSearchData] = useState<any>(null)

  return (
    <div className={styles.container}>
      <legend className={styles.legend}>Search</legend>
      <FormProvider>
        <Search setData={setSearchData} />
      </FormProvider>
      {searchData && (
        <section className={styles.searchedContainer}>
          {searchData.item.map((value: any) => {
            const {
              title, author, pubDate, publisher, cover, link, isbn13,
            } = value
            return (
              <div className={styles.book} key={isbn13}>
                <div className={styles.content}>
                  <div className={styles.image}>
                    <a href={link} target="_blank" rel="noreferrer">
                      <img src={cover} alt="none" />
                    </a>
                  </div>
                  <div className={styles.info}>
                    <h4 className={styles.title}>{title}</h4>
                    <p className={styles.description}>{author}</p>
                    <p className={styles.description}>{publisher}</p>
                    <time className={styles.description}>{pubDate}</time>
                  </div>
                </div>
                <Select isbn13={isbn13} />
              </div>
            )
          })}
        </section>
      )}
    </div>
  )
}
