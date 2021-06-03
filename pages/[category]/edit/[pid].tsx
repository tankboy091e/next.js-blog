import { verifyIdToken } from 'lib/db/admin'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import dynmaic from 'next/dynamic'
import ArticleEditor from 'templates/article-editor'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))
  return (
    <Layout>
      <ArticleEditor />
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
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
