import { GetServerSideProps } from 'next'
import isValidCategory from 'lib/util/category'
import styles from 'sass/templates/list.module.scss'
import List from 'components/list'
import getOrigin from 'lib/util/origin'
import Layout from 'layouts/default'
import usePageQuery from 'lib/hooks/page-query'

function Page({ data } : any) {
  const { category } = usePageQuery()
  return (
    <Layout>
      <section className={styles.container}>
        <List data={data} category={category} />
      </section>
    </Layout>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.params
  if (!isValidCategory(category)) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  const res = await fetch(`${getOrigin()}/api/${category}`)

  if (!res.ok) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  const data = await res.json()

  return {
    props: {
      titleHead: category || null,
      data,
    },
  }
}
