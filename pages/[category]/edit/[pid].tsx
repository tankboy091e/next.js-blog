import { verifyIdToken } from 'lib/db/admin'
import { GetServerSideProps } from 'next'
import dynmaic from 'next/dynamic'
import ArticleEditor from 'templates/article-editor'
import isValidCategory from 'lib/util/category'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))
  return (
    <Layout
      title="edit"
    >
      <ArticleEditor />
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
    const { cookies } = context.req
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
