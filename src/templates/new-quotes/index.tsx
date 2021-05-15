import FormProvider from 'providers/form'
import styles from 'sass/templates/new-quotes.module.scss'
import Inner, { NewQuotesProps } from './inner'

export default function NewQuotes(props: NewQuotesProps) {
  return (
    <section className={styles.container}>
      <h3 className={styles.legend}>{`${'id' in props ? 'Edit' : 'Add New'} Quotes`}</h3>
      <FormProvider>
        <Inner value={props} />
      </FormProvider>
    </section>
  )
}
