import Layout from 'layouts/default'
import ErrorSection from 'templates/error-section'

export default function Page() {
  return (
    <Layout>
      <ErrorSection message="Page Not Found" />
    </Layout>
  )
}
