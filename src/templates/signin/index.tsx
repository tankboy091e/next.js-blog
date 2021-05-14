import FormProvider from 'providers/formProvider'
import styles from 'sass/templates/signin.module.scss'
import Inner from './inner'

export default function SignIn() {
  return (
    <section className={styles.container}>
      <FormProvider>
        <Inner />
      </FormProvider>
    </section>
  )
}
