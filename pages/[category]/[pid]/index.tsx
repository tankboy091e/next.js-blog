import Article, { ArticleData } from 'components/article'
import Layout from 'layouts/default'
import getOrigin from 'lib/util/origin'
import { GetServerSideProps } from 'next'
import ArticleMenu from 'components/article/menu'
import Comments from 'components/comments'
import styles from 'sass/templates/post.module.scss'
import isValidCategory from 'lib/util/category'
import Link from 'next/link'

interface Data {
  category: string
  pid: string
  total: number
  doc: string
  id: number
}

export type Props = Data & ArticleData

export default function Page(props: Props) {
  const {
    title, subtitle, doc, category,
  } = props
  return (
    <Layout
      title={title}
      description={subtitle}
    >
      <section className={styles.container}>
        <Link href={`/${category}`}>
          <a href={`/${category}`} className={styles.back}>{category}</a>
        </Link>
        <Article data={props} />
        <Comments doc={doc} sideWidget={<ArticleMenu />} />
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
