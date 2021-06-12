import { useAuth } from 'providers/auth'
import styles from 'sass/templates/dashboard.module.scss'
import SignIn from './signin'

export default function Dashboard() {
  const { user, signout } = useAuth()
  if (!user) {
    return <SignIn />
  }
  return (
    <section className={styles.container}>
      <button type="button" onClick={signout}>Sign out</button>
    </section>
  )
}
