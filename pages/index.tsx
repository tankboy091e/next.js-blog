import dynmaic from 'next/dynamic'
import Home from 'templates/home'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))
  return (
    <Layout>
      <Home />
    </Layout>
  )
}
