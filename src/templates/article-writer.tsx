import FormProvider from 'providers/form'
import Editor from 'components/article-editor/editor'

export default function ArticleWriter() {
  return (
    <FormProvider>
      <Editor />
    </FormProvider>
  )
}
