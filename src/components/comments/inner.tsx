import { createContext, useContext, useState } from 'react'
import usePageQuery from 'lib/hooks/page-query'
import Loading from 'widgets/loading'
import FormProvider from 'providers/form'
import communicate from 'lib/api'
import Input from './input'
import Comment from './comment'

interface commentsContext {
  refresh: Function
}

const CommentsContext = createContext<commentsContext>(null)

export const useComments = () => useContext(CommentsContext)

export default function Inner({
  article,
  data,
} : {
  article: number,
  data: any[]
}) {
  if (!data) {
    return <Loading size={32} />
  }

  const [children, setChildren] = useState(data)

  const { category, current } = usePageQuery()

  const mutate = async () => {
    const res = await communicate(`/${category}/${current}`)

    if (res.status !== 200) {
      return
    }

    const { comments } = await res.json()

    setChildren(comments)
  }

  const value = {
    refresh: mutate,
  }

  return (
    <CommentsContext.Provider value={value}>
      {children.length > 0 && children.map((value) => (
        <Comment key={value.id} data={value} />
      ))}
      <FormProvider>
        <Input article={article} />
      </FormProvider>
    </CommentsContext.Provider>
  )
}
