import Layout from 'layouts/default'
import styles from 'sass/templates/home.module.scss'
import Resume from 'templates/resume'

function Page({ data } : any) {
  return (
    <Layout>
      <section className={styles.container}>
        <Resume />
      </section>
    </Layout>
  )
}

export default Page
