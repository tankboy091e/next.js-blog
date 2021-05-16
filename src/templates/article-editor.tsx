import FormProvider from 'providers/form'
import Editor from 'components/article-editor/editor'
import usePageQuery from 'lib/hooks/page-query'
import { ArticleData } from 'components/article'
import useSWR from 'swr'
import fetcher from 'lib/api/fetcher'
import LoadingSection from './loading'
import ErrorSection from './error-section'

export default function ArticleEditor() {
  const { router, category, current } = usePageQuery()

  if (!router) {
    return <LoadingSection />
  }

  const url = `/api/${category}/${current}`

  const { data, error } = useSWR<ArticleData>(url, fetcher)

  if (error) {
    return <ErrorSection />
  }

  if (!data) {
    return <LoadingSection />
  }

  return (
    <FormProvider>
      <Editor data={data} input={url} method="PUT" backPath={`/${category}/${current}`} />
    </FormProvider>
  )
}
