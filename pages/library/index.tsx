import Layout from 'layouts/default'
import { GetStaticProps } from 'next'
import Library from 'templates/library'

function Page() {
  return (
    <Layout>
      <Library />
    </Layout>
  )
}

export default Page

export const getStaticProps : GetStaticProps = async () => ({
  props: {
    titleHead: 'library',
  },
})
