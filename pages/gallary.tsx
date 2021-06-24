import { GetServerSideProps } from 'next'
import styles from 'sass/templates/gallary.module.scss'
import getOrigin from 'lib/util/origin'
import Layout from 'layouts/default'
import Gallary from 'templates/gallary'

function Page({ data, titleHead } : any) {
  return (
    <Layout>
      <section className={styles.container}>
        <section className={styles.header}>
          <h1>{titleHead}</h1>
        </section>
        <section className={styles.body}>
          <Gallary data={data} />
        </section>
      </section>
    </Layout>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${getOrigin()}/api/gallary`)

  if (!res.ok) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  const data = await res.json()

  return {
    props: {
      titleHead: 'gallary',
      data,
    },
  }
}
