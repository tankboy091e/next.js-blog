import dynmaic from 'next/dynamic'
import Library from 'templates/library'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))
  return (
    <Layout>
      <Library />
    </Layout>
  )
}
