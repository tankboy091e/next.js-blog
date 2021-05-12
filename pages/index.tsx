import dynmaic from 'next/dynamic'
import Post from 'templates/home'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))
  return (
    <Layout>
      <Post />
    </Layout>
  )
}
