import Layout from 'layouts/default'
import { GetStaticProps } from 'next'
import ErrorSection from 'templates/error-section'

function Page() {
  return (
    <Layout>
      <ErrorSection message="Page Not Found" />
    </Layout>
  )
}

export default Page

export const getStaticProps : GetStaticProps = async () => ({
  props: {
    titleHead: '404',
  },
})
