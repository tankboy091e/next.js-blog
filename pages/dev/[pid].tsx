import dynmaic from 'next/dynamic'
import Post from 'templates/post'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))
  return (
    <Layout>
      <Post />
    </Layout>
  )
}
