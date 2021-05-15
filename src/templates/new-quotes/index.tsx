import FormProvider from 'providers/form'
import styles from 'sass/templates/new-quotes.module.scss'
import Inner from './inner'

export default function NewQuotes({ isbn }: { isbn: string | string[]}) {
  return (
    <section className={styles.container}>
      <h3 className={styles.legend}>Add New Quotes</h3>
      <FormProvider>
        <Inner isbn={isbn} />
      </FormProvider>
    </section>
  )
}
