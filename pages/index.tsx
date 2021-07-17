import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import styles from 'sass/templates/home.module.scss'
import Title from 'components/title'
import Bookcase from 'templates/bookcase'
import Posts from 'templates/posts'
import { communicateWithContext } from 'lib/api'

function Page({ data } : any) {
  const { posts, books } = data
  return (
    <Layout>
      <section className={styles.container}>
        <Title />
        <Bookcase data={books} />
        <Posts data={posts} />
      </section>
    </Layout>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await communicateWithContext('/home', context)

  if (res.status !== 200 && res.status !== 304) {
    throw new Error()
  }

  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}
