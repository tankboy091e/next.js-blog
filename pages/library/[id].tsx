import Layout from 'layouts/default'
import { communicateWithContext } from 'lib/api'
import { GetServerSideProps } from 'next'
import Quotes from 'templates/quotes'

function Page({ id, data } : any) {
  return (
    <Layout>
      <Quotes id={parseInt(id, 10)} data={data} />
    </Layout>
  )
}

export default Page

export const getServerSideProps : GetServerSideProps = async (context) => {
  const { id } = context.query

  const res = await communicateWithContext(`/library/${id}`, context)

  if (res.status !== 200 && res.status !== 304) {
    throw new Error()
  }

  const data = await res.json()

  const { title } = data

  return {
    props: {
      titleHead: title || null,
      id,
      data,
    },
  }
}
