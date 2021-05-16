import FormProvider from 'providers/form'
import styles from 'sass/templates/contact.module.scss'
import ContactInner from './inner'

export default function Contact() {
  return (
    <section className={styles.container}>
      <h1 className={styles.legend}>Contact</h1>
      <FormProvider>
        <ContactInner />
      </FormProvider>
    </section>
  )
}
