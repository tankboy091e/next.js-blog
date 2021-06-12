import Layout from 'layouts/default'
import { GetStaticProps } from 'next'
import Dashboard from 'templates/dashboard'

function Page() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}

export default Page

export const getStaticProps : GetStaticProps = async () => ({
  props: {
    titleHead: 'admin',
  },
})
