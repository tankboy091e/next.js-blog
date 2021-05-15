import Article, { ArticleData } from 'components/article'
import Comments from 'components/comments'
import Pagenation from 'components/pagination'
import usePageQuery from 'lib/hooks/page-query'
import fetcher from 'lib/api/fetcher'
import styles from 'sass/templates/post.module.scss'
import Head from 'next/head'
import useSWR from 'swr'
import PageNotFound from './404'
import LoadingSection from './loading'

interface PostData {
  total: number,
  doc: string,
  id: number
}

type Data = PostData & ArticleData

export default function Post() {
  const pageQuery = usePageQuery()

  if (!pageQuery) {
    return <></>
  }
  const { category, current } = pageQuery

  const { data, error } = useSWR<Data>(`/api/${category}/${current}`, fetcher)

  if (error) {
    return <PageNotFound />
  }

  if (!data) {
    return <LoadingSection />
  }

  return (
    <section className={styles.container}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Article data={data} />
      <Comments doc={data.doc} />
      <Pagenation category={category} current={current} total={data.total} />
    </section>
  )
}
