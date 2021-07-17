import Article from 'components/article'
import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import ArticleMenu from 'components/article/menu'
import Comments from 'components/comments'
import styles from 'sass/templates/post.module.scss'
import isValidCategory from 'lib/util/category'
import Link from 'next/link'
import { communicateWithContext } from 'lib/api'

function Page({ comments, article, category }: any) {
  return (
    <Layout>
      <section className={styles.container}>
        <Link href={`/${category}`}>
          <a href={`/${category}`} className={styles.back}>
            {category}
          </a>
        </Link>
        <Article data={article} />
        <Comments article={article.id} data={comments} sideWidget={<ArticleMenu />} />
      </section>
    </Layout>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category, pid } = context.params
  if (!isValidCategory(category)) {
    return {
      notFound: true,
    }
  }

  const res = await communicateWithContext(`/${category}/${pid}`, context)

  if (res.status !== 200) {
    throw new Error()
  }

  const data = await res.json()

  const { title, subtitle } = data.article

  return {
    props: {
      titleHead: `${title}${subtitle && `—${subtitle}`}` || null,
      typeHead: 'article',
      category,
      ...data,
    },
  }
}
