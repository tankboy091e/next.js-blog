import dynmaic from 'next/dynamic'
import ErrorSection from 'templates/error-section'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))

  return (
    <Layout>
      <ErrorSection message="Page Not Found" />
    </Layout>
  )
}
