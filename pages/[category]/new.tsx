import { GetServerSideProps } from 'next'
import Layout from 'layouts/default'
import ArticleWriter from 'templates/article-writer'
import isValidCategory from 'lib/util/category'
import { ACCESS_TOKEN } from 'providers/auth'

function Page() {
  return (
    <Layout>
      <ArticleWriter />
    </Layout>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.params
  if (!isValidCategory(category)) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  const token = context.req.cookies[ACCESS_TOKEN]

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      titleHead: 'new',
    },
  }
}
