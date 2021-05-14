import dynmaic from 'next/dynamic'
import Dashboard from 'templates/dashboard'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}
