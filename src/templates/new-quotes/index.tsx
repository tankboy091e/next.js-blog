import FormProvider from 'providers/form'
import styles from 'sass/templates/new-quotes.module.scss'
import NewQuotesInner, { NewQuotesProps } from './inner'

export default function NewQuotes(props: NewQuotesProps) {
  return (
    <section className={styles.container}>
      <h3 className={styles.legend}>{`${'id' in props ? 'Edit' : 'Add New'} Quotes`}</h3>
      <FormProvider>
        <NewQuotesInner value={props} />
      </FormProvider>
    </section>
  )
}
