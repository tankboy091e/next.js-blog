import Article, { ArticleData } from 'components/article'
import Comments from 'components/comments'
import Pagenation from 'components/pagination'
import usePageQuery from 'lib/hooks/pageQuery'
import fetcher from 'lib/api/fetcher'
import styles from 'sass/templates/post.module.scss'
import useSWR from 'swr'
import PageNotFound from './404'

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
    return <></>
  }

  return (
    <section className={styles.container}>
      <Article data={data} />
      <Comments doc={data.doc} />
      <Pagenation category={category} current={current} total={data.total} />
    </section>
  )
}
