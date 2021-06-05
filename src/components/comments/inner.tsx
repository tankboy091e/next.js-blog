import { createContext, useContext } from 'react'
import useSWR from 'swr'
import fetcher from 'lib/api/fetcher'
import usePageQuery from 'lib/hooks/page-query'
import Loading from 'widgets/loading'
import FormProvider from 'providers/form'
import Input from './input'
import Comment, { commentData } from './comment'

interface commentsContext {
  refresh: Function
}

const CommentsContext = createContext<commentsContext>(null)

export const useComments = () => useContext(CommentsContext)

export default function Inner({
  doc,
} : {
  doc: string
}) {
  const { category, current } = usePageQuery()
  const { data, mutate } = useSWR<commentData[]>(
    `/api/comments/${category}/${current}`,
    fetcher,
  )

  if (!data) {
    return <Loading size={32} />
  }

  const value = {
    refresh: mutate,
  }

  return (
    <CommentsContext.Provider value={value}>
      {data.length > 0 && data.map((value) => (
        <Comment key={value.id} data={value} />
      ))}
      <FormProvider>
        <Input doc={doc} />
      </FormProvider>
    </CommentsContext.Provider>
  )
}
