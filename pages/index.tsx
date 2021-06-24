import Layout from 'layouts/default'
import getOrigin from 'lib/util/origin'
import { GetServerSideProps } from 'next'
import styles from 'sass/templates/home.module.scss'
import dynamic from 'next/dynamic'

function Page({ data } : any) {
  const Title = dynamic(() => import('components/title'))
  const About = dynamic(() => import('templates/about'))
  const Bookcase = dynamic(() => import('templates/bookcase'))
  const Posts = dynamic(() => import('templates/posts'))
  const { about, posts, books } = data
  return (
    <Layout>
      <section className={styles.container}>
        <Title />
        <About data={about} />
        <Bookcase data={books} />
        <Posts data={posts} />
      </section>
    </Layout>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${getOrigin()}/api/home`)
  if (!res.ok) {
    return {
      props: {
        error: 'oops',
      },
    }
  }
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}
