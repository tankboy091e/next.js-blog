import { verifyIdToken } from 'lib/db/admin'
import { GetServerSideProps } from 'next'
import dynmaic from 'next/dynamic'
import ArticleEditor from 'templates/article-editor'
import isValidCategory from 'lib/util/category'
import getOrigin from 'lib/util/origin'

function Page({ data, category, pid } : { data: any, category: string, pid: string}) {
  const Layout = dynmaic(() => import('layouts/default'))
  return (
    <Layout>
      <ArticleEditor data={data} category={category} current={pid} />
    </Layout>
  )
}

export default Page

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
  try {
    const { cookies } = context.req
    await verifyIdToken(cookies.token)

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
        titleHead: 'edit',
        data,
        category,
        pid,
      },
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
