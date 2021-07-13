import FormProvider from 'providers/form'
import Editor from 'components/article-editor/editor'

export default function ArticleEditor({
  data,
  category,
  current,
}: {
  data: any
  category: string
  current: string
}) {
  return (
    <FormProvider>
      <Editor
        data={data}
        input={`/api/${category}/${current}`}
        method="PUT"
        backPath={`/${category}/${current}`}
      />
    </FormProvider>
  )
}
