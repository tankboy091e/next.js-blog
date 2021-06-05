import { GetServerSideProps } from 'next'
import isValidCategory from 'lib/util/category'
import styles from 'sass/templates/list.module.scss'
import List from 'components/list'
import getOrigin from 'lib/util/origin'
import Layout from 'layouts/default'
import usePageQuery from 'lib/hooks/page-query'

export default function Page({ data } : any) {
  const { category } = usePageQuery()
  return (
    <Layout
      title={category}
    >
      <section className={styles.container}>
        <List data={data} category={category} />
      </section>
    </Layout>
  )
}

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
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

// export const getStaticProps: GetStaticProps = async () => ({
//   props: {},
// })

// export const getStaticPaths: GetStaticPaths = async () => ({
//   paths: [
//     { params: { category: 'sum' } },
//     { params: { category: 'essais' } },
//     { params: { category: 'dev' } },
//   ],
//   fallback: false,
// })
