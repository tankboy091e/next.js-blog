import { verifyIdToken } from 'lib/db/admin'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import Layout from 'layouts/default'
import ArticleWriter from 'templates/article-writer'
import isValidCategory from 'lib/util/category'

export default function Page() {
  return (
    <Layout>
      <ArticleWriter />
    </Layout>
  )
}

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
  try {
    const cookies = nookies.get(context)
    await verifyIdToken(cookies.token)
    return {
      props: {},
    }
  } catch {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
