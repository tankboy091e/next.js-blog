import FormProvider from 'providers/form'
import { useState } from 'react'
import styles from 'sass/templates/librarian/index.module.scss'
import SearchedBook from '../widgets/searched-book'
import Search from '../components/librarian-search'

export default function Librarian() {
  const [searchData, setSearchData] = useState<any>(null)

  return (
    <section className={styles.container}>
      <h3 className={styles.legend}>Search</h3>
      <FormProvider>
        <Search setData={setSearchData} />
      </FormProvider>
      {searchData && (
        <section className={styles.searchedContainer}>
          {searchData.item.length < 1 ? (
            <p className={styles.result}>No result</p>
          ) : (
            searchData.item.map((value: any) => (
              <SearchedBook key={value.isbn13 || value.isbn} value={value} />
            ))
          )}
        </section>
      )}
    </section>
  )
}
