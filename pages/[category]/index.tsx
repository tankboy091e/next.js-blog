import { GetServerSideProps } from 'next'
import isValidCategory from 'lib/util/category'
import styles from 'sass/templates/list.module.scss'
import List from 'components/list'
import Layout from 'layouts/default'
import usePageQuery from 'lib/hooks/page-query'
import { communicateWithContext } from 'lib/api'

function Page({ data, titleHead } : any) {
  const { category } = usePageQuery()
  return (
    <Layout>
      <section className={styles.container}>
        <section className={styles.header}>
          <h1>{titleHead}</h1>
        </section>
        <section className={styles.body}>
          <List data={data} category={category} />
        </section>
      </section>
    </Layout>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.params
  if (!isValidCategory(category)) {
    return {
      notFound: true,
    }
  }

  const res = await communicateWithContext(`/${category}`, context)

  if (res.status !== 200 && res.status !== 304) {
    throw new Error()
  }

  const data = await res.json()

  return {
    props: {
      titleHead: category || null,
      data,
    },
  }
}
