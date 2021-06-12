import Layout from 'layouts/default'
import { GetStaticProps } from 'next'
import Contact from 'templates/contact'

function Page() {
  return (
    <Layout>
      <Contact />
    </Layout>
  )
}

export default Page

export const getStaticProps : GetStaticProps = async () => ({
  props: {
    titleHead: 'contact',
  },
})
