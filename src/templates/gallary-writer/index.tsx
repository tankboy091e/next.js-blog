import FormProvider from 'providers/form'
import styles from 'sass/templates/gallary-writer.module.scss'
import GallaryWriterInner from './inner'

export default function GallaryWriter() {
  return (
    <section className={styles.container}>
      <h3 className={styles.legend}>New</h3>
      <FormProvider>
        <GallaryWriterInner />
      </FormProvider>
    </section>
  )
}
