import FormProvider from 'providers/form'
import styles from 'sass/templates/signin.module.scss'
import SigninInner from './inner'

export default function SignIn() {
  return (
    <section className={styles.container}>
      <FormProvider>
        <SigninInner />
      </FormProvider>
    </section>
  )
}
