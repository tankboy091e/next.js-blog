import dynmaic from 'next/dynamic'
import Contact from 'templates/contact'

export default function Page() {
  const Layout = dynmaic(() => import('layouts/default'))
  return (
    <Layout>
      <Contact />
    </Layout>
  )
}
