import Layout from 'layouts/default'
import getOrigin from 'lib/util/origin'
import { GetServerSideProps } from 'next'
import styles from 'sass/templates/home.module.scss'
import About from 'templates/about'
import Bookcase from 'templates/bookcase'
import Posts from 'templates/posts'

export default function Page({ data } : any) {
  const { about, posts, books } = data
  return (
    <Layout>
      <section className={styles.container}>
        <About data={about} />
        <Bookcase data={books} />
        <Posts data={posts} />
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${getOrigin()}/api/home`)
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}
