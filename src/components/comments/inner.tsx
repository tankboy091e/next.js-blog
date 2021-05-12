import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'
import useSWR from 'swr'
import fetcher from 'lib/util/fetcher'
import Input from './input'
import Comment, { commentData } from './comment'
import FormProvider from '../../providers/formProvider'

interface commentsContext {
  refresh: Function
}

const CommentsContext = createContext<commentsContext>(null)

export const useComments = () => useContext(CommentsContext)

export default function Inner() {
  const router = useRouter()
  const { data, mutate } = useSWR<commentData[]>(
    `/api/comments${router.asPath}`,
    fetcher,
  )

  let key = 0

  const value = {
    refresh: mutate,
  }

  return (
    <CommentsContext.Provider value={value}>
      {data?.length > 0 && data.map((value) => {
        key += 1
        return <Comment key={key} index={key - 1} data={value} />
      })}
      <FormProvider>
        <Input />
      </FormProvider>
    </CommentsContext.Provider>
  )
}
