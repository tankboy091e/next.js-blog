import { useAuth } from 'providers/auth'
import { getValue, useForm } from 'providers/form'
import { useEffect, useRef } from 'react'
import styles from 'sass/templates/signin.module.scss'

export default function Inner() {
  const email = useRef<HTMLInputElement>()
  const password = useRef<HTMLInputElement>()
  const remember = useRef<HTMLInputElement>()

  const { signin } = useAuth()

  const { setOptions } = useForm()

  useEffect(() => {
    setOptions({
      onSubmit: async () => {
        await signin(
          getValue(email, true),
          getValue(password, true),
          remember.current.checked ? 'local' : 'session',
        )
      },
      backPath: '/admin',
      transitionInterval: 0,
      containerClassName: styles.formContainer,
      innerClassName: styles.inner,
      submitClassName: styles.submit,
    })
  }, [])

  return (
    <>
      <legend className={styles.legend}>Sign In</legend>
      <input className={styles.field} type="email" name="Email" ref={email} placeholder="email" />
      <input
        className={styles.field}
        type="password"
        name="Password"
        ref={password}
        placeholder="password"
        autoComplete="off"
      />
      <label htmlFor="remember" className={styles.checkboxLabel}>
        <input className={styles.checkbox} type="checkbox" ref={remember} name="remember" />
        remember
      </label>
    </>
  )
}
