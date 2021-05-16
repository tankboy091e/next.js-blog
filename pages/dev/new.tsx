import { verifyIdToken } from 'lib/db/admin'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import dynmaic from 'next/dynamic'
import ArticleWriter from 'templates/article-writer'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))
  return (
    <Layout>
      <ArticleWriter />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context)
    await verifyIdToken(cookies.token)
    return {
      props: {},
    }
  } catch {
    nookies.destroy(context, 'token')
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
