import Layout from 'layouts/default'
import { useRouter } from 'next/router'
import LoadingSection from 'templates/loading'
import Quotes from 'templates/quotes'

export default function Page() {
  const { query } = useRouter()
  const { isbn } = query

  if (!isbn) {
    return (
      <Layout>
        <LoadingSection />
      </Layout>
    )
  }

  return (
    <Layout>
      <Quotes isbn={isbn} />
    </Layout>
  )
}
