import Layout from 'layouts/default'
import ErrorSection from 'templates/error-section'

export default function Page() {
  return (
    <Layout
      title="404"
    >
      <ErrorSection message="Page Not Found" />
    </Layout>
  )
}
