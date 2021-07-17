import { GetServerSideProps } from 'next'
import dynmaic from 'next/dynamic'
import ArticleEditor from 'templates/article-editor'
import isValidCategory from 'lib/util/category'
import { communicateWithContext } from 'lib/api'
import { ACCESS_TOKEN } from 'providers/auth'

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
  const token = context.req.cookies[ACCESS_TOKEN]

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const res = await communicateWithContext(`/${category}/${pid}`, context)

  if (res.status !== 200) {
    throw new Error()
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
}
