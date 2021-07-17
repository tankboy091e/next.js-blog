import Layout from 'layouts/default'
import { communicateWithContext } from 'lib/api'
import { GetServerSideProps } from 'next'
import Library from 'templates/library'

function Page({ data } : { data: any[] }) {
  return (
    <Layout>
      <Library data={data} />
    </Layout>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await communicateWithContext('/library', context)

  if (res.status !== 200) {
    throw new Error()
  }

  const data = await res.json()

  return {
    props: {
      titleHead: 'library',
      data,
    },
  }
}
