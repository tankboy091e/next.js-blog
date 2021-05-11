import dynmaic from 'next/dynamic'
import PageNotFound from 'templates/404'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))

  return (
    <Layout>
      <PageNotFound />
    </Layout>
  )
}
