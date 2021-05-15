import dynmaic from 'next/dynamic'
import LoadingSection from 'templates/loading'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))
  return (
    <Layout>
      <LoadingSection />
    </Layout>
  )
}
