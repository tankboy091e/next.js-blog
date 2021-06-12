import Layout from 'layouts/default'
import getOrigin from 'lib/util/origin'
import { GetServerSideProps } from 'next'
import Quotes from 'templates/quotes'

function Page({ data } : any) {
  return (
    <Layout>
      <Quotes data={data} />
    </Layout>
  )
}

export default Page

export const getServerSideProps : GetServerSideProps = async (context) => {
  const { isbn } = context.query

  const res = await fetch(`${getOrigin()}/api/books/${isbn}`)

  if (!res.ok) {
    return {
      props: {
        error: 'oops',
      },
    }
  }

  const data = await res.json()

  const { title } = data
  return {
    props: {
      titleHead: title || null,
      data: {
        isbn,
        ...data,
      },
    },
  }
}
