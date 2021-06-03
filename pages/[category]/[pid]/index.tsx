import Article, { ArticleData } from 'components/article'
import Layout from 'layouts/default'
import getOrigin from 'lib/util/origin'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import ArticleMenu from 'components/article/menu'
import Comments from 'components/comments'
import Pagenation from 'components/pagination'
import styles from 'sass/templates/post.module.scss'
import isValidCategory from 'lib/util/category'

interface Data {
  category: string
  pid: number
  total: number
  doc: string
  id: number
}

export type Props = Data & ArticleData

export default function Page(props: Props) {
  const {
    title, doc, category, pid, total,
  } = props
  return (
    <Layout>
      <section className={styles.container}>
        <Head>
          <title>{title}</title>
        </Head>
        <Article data={props} />
        <Comments doc={doc} sideWidget={<ArticleMenu />} />
        <Pagenation category={category} current={pid} total={total} />
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category, pid } = context.params

  if (!isValidCategory(category)) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  const res = await fetch(`${getOrigin()}/api/${category}/${pid}`)

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
      category,
      pid,
      ...data,
    },
  }
}
